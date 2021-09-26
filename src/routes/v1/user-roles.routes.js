const { Router } = require('express');
const UserRolesModel = require('../../models/user-roles/user-roles.model');
const { baseRoute } = require('./base.routes');
const UserRoleSchema = require('../../validation/UserRoleSchema');
const { isValidBody } = require('../../middlewares/validation.middleware');


const UserRolesRouter = Router();
const isUpdate = true;

baseRoute(
  UserRolesRouter,
  UserRolesModel,
  'user-roles',
  {
    postOptions: { 
      postMiddlewares: [isValidBody(UserRoleSchema())] 
    },
    putOptions: { 
      putMiddlewares: [isValidBody(UserRoleSchema(isUpdate))] 
    }
  }
)

module.exports = UserRolesRouter;