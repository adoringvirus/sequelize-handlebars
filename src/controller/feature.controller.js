const UsersFeaturesRelationModel = require("../models/relations/user-features-users.model");

module.exports  = {
  async unsignedFeatureFromUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { userFeatureId } = req.params;

    try {
      const deletedAssignment  = await UsersFeaturesRelationModel.destroy({
        where:{
          user_id: 1,
          user_feature_id: userFeatureId
        }
      });
    
      if( deletedAssignment.length === 0 ) res.status(400).json({
        message:'',
        status: '',
        error: 'user does not exist'
      });
  
      return res.status(200).json({
        message:'',
        data:deletedAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async assignFeatureToUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { userFeatureId } = req.params;

    try {
      const newFeatureAssignment  = await UsersFeaturesRelationModel.create({
        user_id: 1,
        user_feature_id: userFeatureId
      });
  
      return res.status(200).json({
        message:'',
        data: newFeatureAssignment
      })
    } catch (error) {
      // console.log(`error`, error.parent.detail)
      res.status(400).json({
        message:'',
        status:'failed',
        error:error.parent.detail
      })
    }
  }
}