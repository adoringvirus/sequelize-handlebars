const { Router } = require('express');
const MoviesRouter = require('./movie.routes');
const UserRouter = require('./user.routes');

const V1RootRouter = Router();

V1RootRouter.get('/',(req,res)=>{
  res.json({
    checking:'hellooo'
  })
})

V1RootRouter.use(UserRouter);
V1RootRouter.use(MoviesRouter)


module.exports = V1RootRouter