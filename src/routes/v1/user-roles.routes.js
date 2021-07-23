const { Router } = require('express');
const UserRoles = require('../../models/user-roles.model');
const { baseRoute } = require('./base.routes');


const UserRolesRouter = Router();
CrudUserRolesRouter = baseRoute(UserRolesRouter,UserRoles,'user-roles')

module.exports = UserRolesRouter;