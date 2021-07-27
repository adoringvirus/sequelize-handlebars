const { Router } = require('express');
const UserFeaturesModel = require('../../models/user-features.model');
const { baseRoute } = require('./base.routes');


const UserFeaturesRouter = Router();
baseRoute(
  UserFeaturesRouter,
  UserFeaturesModel,
  'user-features',
  'users/user-features'
)

module.exports = UserFeaturesRouter;