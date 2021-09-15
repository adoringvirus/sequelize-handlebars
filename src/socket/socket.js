const http = require('http');
const socket = require('socket.io')
const TaskModel = require('../models/task.model')
const { findAllTask, updateOneTask } = require('./task.service')
const { newTask,destroyTask, updateTask } = require('./socket.events');

module.exports =  (app=null)=>{
  let io, httpServer
  const corsOptions =  {
    cors:{
      origin: ['http://localhost:3000']
    }
  }

  // * checking if the express application is passed
  if(app){
    httpServer = http.createServer(app)
    io = socket(httpServer,corsOptions)
  }else{
    io = socket(process.env.SOCKET_PORT || 3004,corsOptions)
  } 
  
  
  io.on('connection',async (client)=>{      
    console.log(`New connection`,client.id)

    io.on("get:task",async (client)=>{
      console.log(`algo paso`)
      client.emit('get:task',await findAllTask())
    })

    client.emit('get:task',await findAllTask())
    // client.emit('get:task',await findAllTask())
    client.on('delete:task',(data)=>destroyTask(client,data))
    client.on('update:task',(data)=>updateTask(client,data))
    client.on('new:task',(data)=>newTask(client,data))
  })

  // * if express app exist initialize the http server with that configuration
  // ! This might generate performance issues since we are copying
  // ! everything again in a different port
  
  if(app) { httpServer.listen(process.env.SOCKET_PORT || 3005) }
}