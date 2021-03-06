const http = require('http');
const socket = require('socket.io')
const jwt = require('jsonwebtoken');

module.exports =  (app=null)=>{
  let io, httpServer
  const corsOptions =  {
    cors:{
      origin: [process.env.SOCKET_HOST || 'http://localhost:3000'],
      method:['GET','POST']
    }
  }

  // * checking if the express application is passed
  if(app){
    httpServer = http.createServer(app)
    io = socket(httpServer,corsOptions)
  }else{
    io = socket(process.env.SOCKET_PORT || 3004,corsOptions)
  } 
  io.use(async (socket,next)=>{
    if(socket.handshake.query && socket.handshake.query.token){
      try {
        const verified = jwt.verify(socket.handshake.query.token,'SECRET');
        socket.decoded = verified;
        next()
      } catch (error) {
        return next(new Error('Not authenticated'))
      }
      
    }
    else{
      next(new Error('Not authenticated'))
    }
  })
  .on('connection',async (client)=>{      
    console.log(`New connection`,client.id)

  })

  // * if express app exist initialize the http server with that configuration
  // ! This might generate performance issues since we are copying
  // ! everything again in a different port
  
  if(app) { httpServer.listen(process.env.SOCKET_PORT || 3005) }
}