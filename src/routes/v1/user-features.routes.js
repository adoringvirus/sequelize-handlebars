const { Router } = require('express');
const { unsignedFeatureFromUser, assignFeatureToUser } = require('../../controller/feature.controller');
const UserFeaturesModel = require('../../models/user-features.model');
const UserModel = require('../../models/user.model');
const { baseRoute } = require('./base.routes');


const UserFeaturesRouter = Router();

UserFeaturesRouter.get('/users/user-features',async (req,res)=>{
  try {
    const features = await UserFeaturesModel.findAll({
      include: UserModel
    })
    res.status(200).json({features})
  } catch (error) {
    res.status(400).json({error})
  }
})

UserFeaturesRouter.post('/users/user-features/:userFeatureId',assignFeatureToUser)
UserFeaturesRouter.delete('/users/user-features/:userFeatureId',unsignedFeatureFromUser)

baseRoute(
  UserFeaturesRouter,
  UserFeaturesModel,
  'user-features',
  'user-features'
)

module.exports = UserFeaturesRouter;