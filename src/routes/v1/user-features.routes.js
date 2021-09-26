const { Router } = require('express');
const { unsignedFeatureFromUser, assignFeatureToUser } = require('../../controller/feature.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid, isValidBody } = require('../../middlewares/validation.middleware');
const UserFeaturesModel = require('../../models/user-features/user-features.model');
const { baseRoute } = require('./base.routes');
const UserFeatureSchema = require('../../validation/UserFeatureSchema');


const UserFeaturesRouter = Router();
const BASE_ROUTE_PREFIX = `/users/:userId/user-features/:userFeatureId`;
const isUpdate = true;

baseRoute(
  UserFeaturesRouter,
  UserFeaturesModel,
  'user-features',
  {
    postOptions: { 
      postMiddlewares: [isValidBody(UserFeatureSchema())] 
    },
    putOptions: { 
      putMiddlewares: [isValidBody(UserFeatureSchema(isUpdate))] 
    }
  }
)
UserFeaturesRouter.post(`${BASE_ROUTE_PREFIX}`,isParamValid,isSuperAdmin,assignFeatureToUser)
UserFeaturesRouter.delete(`${BASE_ROUTE_PREFIX}`,isParamValid,isSuperAdmin,unsignedFeatureFromUser)


module.exports = UserFeaturesRouter;