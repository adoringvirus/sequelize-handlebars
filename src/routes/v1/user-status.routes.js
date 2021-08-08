const { Router } = require('express');
const UserStatusModel = require('../../models/user-status.model');
const UserModel = require('../../models/user.model');
const { baseRoute } = require('./base.routes');


const UserStatusRouter = Router();

UserStatusRouter.get('/users/user-status',(req,res)=>{

  UserStatusModel.findAll({
  
    include: UserModel
  }).then((roles)=>{

    res.status(201).json({roles})
  }).catch(error=>{
    console.log(`error`, error)
  })
})

baseRoute(UserStatusRouter,UserStatusModel,'user-status','user-status')

module.exports = UserStatusRouter;