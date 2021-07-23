const { Router } = require('express');
const UserStatus = require('../../models/user-status.model');
const { baseRoute } = require('./base.routes');


const UserStatusRouter = Router();
CrudUserStatusRouter = baseRoute(UserStatusRouter,UserStatus,'user-status')

module.exports = UserStatusRouter;