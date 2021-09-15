const { Router } = require('express');
const { unsignedFeatureFromUser, assignFeatureToUser } = require('../../controller/feature.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const UserFeaturesModel = require('../../models/user-features/user-features.model');
const { baseRoute } = require('./base.routes');


const UserFeaturesRouter = Router();
const BASE_ROUTE_PREFIX = `/users/:userId/user-features/:userFeatureId`;

baseRoute(
  UserFeaturesRouter,
  UserFeaturesModel,
  'user-features',
)
UserFeaturesRouter.post(`${BASE_ROUTE_PREFIX}`,isParamValid,assignFeatureToUser)
UserFeaturesRouter.delete(`${BASE_ROUTE_PREFIX}`,isParamValid,unsignedFeatureFromUser)


module.exports = UserFeaturesRouter;