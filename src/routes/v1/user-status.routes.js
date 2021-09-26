const { Router } = require('express');
const { isValidBody } = require('../../middlewares/validation.middleware');
const UserStatusModel = require('../../models/user-status/user-status.model');
const { baseRoute } = require('./base.routes');
const UserStatusSchema = require('../../validation/UserStatusSchema');

const UserStatusRouter = Router();
const isUpdate = true;

baseRoute(
  UserStatusRouter,
  UserStatusModel,
  'user-status',
  {
    postOptions:{
      postMiddlewares: [isValidBody(UserStatusSchema())]
    },
    putOptions: {
      putMiddlewares: [isValidBody(UserStatusSchema(isUpdate))]
    }
  }
)

module.exports = UserStatusRouter;