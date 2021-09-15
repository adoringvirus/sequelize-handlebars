const UsersFeaturesRelationModel = require("../models/relations/user-features-users.model");


module.exports = {
  async addFeatureToUser(userFeatureId,userId){
    try {
      return await UsersFeaturesRelationModel.create({
        user_id: userId,
        user_feature_id: userFeatureId
      });
      
    } catch (error) {
      console.log(`error`, error.parent.detail)
      return null
    }
  },
  async deleteFeatureFromUser(userFeatureId,userId){
    try {
      const deletedAssignment  = await UsersFeaturesRelationModel.destroy({
        where:{
          user_id: userId,
          user_feature_id: userFeatureId
        }
      });
    
      if(!deletedAssignment) return undefined
  
      return deletedAssignment
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}