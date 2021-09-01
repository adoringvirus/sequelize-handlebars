const { Router } = require('express');
const { unsignedFeatureFromUser, assignFeatureToUser } = require('../../controller/feature.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const UserFeaturesModel = require('../../models/user-features.model');
const { baseRoute } = require('./base.routes');


const UserFeaturesRouter = Router();
const BASE_ROUTE_PREFIX = `/users/user-features/:userFeatureId`;

UserFeaturesRouter.post(`${BASE_ROUTE_PREFIX}`,isParamValid,assignFeatureToUser)
UserFeaturesRouter.delete(`${BASE_ROUTE_PREFIX}`,isParamValid,unsignedFeatureFromUser)

baseRoute(
  UserFeaturesRouter,
  UserFeaturesModel,
  'user-features',
)

module.exports = UserFeaturesRouter;