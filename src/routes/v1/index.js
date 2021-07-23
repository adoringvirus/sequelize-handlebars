const { Router } = require('express');
const MoviesRouter = require('./movie.routes');
const UserRolesRouter = require('./user-roles.routes');
const UserStatusRouter = require('./user-status.routes');
const UserRouter = require('./user.routes');

const V1RootRouter = Router();

V1RootRouter.get('/',(req,res)=>{
  res.json({
    checking:'hellooo'
  })
})

V1RootRouter.use(UserRouter);
V1RootRouter.use(MoviesRouter);
V1RootRouter.use(UserStatusRouter);
V1RootRouter.use(UserRolesRouter)


module.exports = V1RootRouter