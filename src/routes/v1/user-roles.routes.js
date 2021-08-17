const { Router } = require('express');
const UserRolesModel = require('../../models/user-roles.model');
const { baseRoute } = require('./base.routes');


const UserRolesRouter = Router();

baseRoute(
  UserRolesRouter,
  UserRolesModel,
  'user-roles',
)

module.exports = UserRolesRouter;