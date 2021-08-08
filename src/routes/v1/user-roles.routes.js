const { Router } = require('express');
const UserRolesModel = require('../../models/user-roles.model');
const UserModel = require('../../models/user.model');
const { baseRoute } = require('./base.routes');


const UserRolesRouter = Router();

UserRolesRouter.get('/users/user-roles',(req,res)=>{

    UserRolesModel.findAll({
    
      include: UserModel
    }).then((roles)=>{

      res.status(201).json({roles})
    }).catch(error=>{
      console.log(`error`, error)
    })
  
})

baseRoute(
  UserRolesRouter,
  UserRolesModel,
  'user-roles',
  'user-roles'
)

module.exports = UserRolesRouter;