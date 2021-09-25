const { Router } = require('express');
const UserStatusModel = require('../../models/user-status/user-status.model');
const { baseRoute } = require('./base.routes');


const UserStatusRouter = Router();

baseRoute(
  UserStatusRouter,
  UserStatusModel,
  'user-status'
)

module.exports = UserStatusRouter;