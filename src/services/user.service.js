const UserModel = require('../models/user/user.model');
const UserRolesModel = require('../models/user-roles/user-roles.model');
const UserStatusModel = require('../models/user-status/user-status.model');
const UserFeaturesModel = require('../models/user-features/user-features.model');

module.exports = {
  async findAllUsers(whereObject={}){
    try {
      const users = await UserModel.findAll({
        where: whereObject,
        include: [
          UserRolesModel,
          UserStatusModel,
          UserFeaturesModel,
        ]
      });
      if(users.length === 0) { return [] }
      return users;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async findOneUser(whereObject){
    try {
      const user = await UserModel.findOne({
        where: whereObject,
        include: [
          UserRolesModel,
          UserStatusModel,
          UserFeaturesModel,
        ]
      });
      return user;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async createOneUser(userInfo){
    try {
      const user = await UserModel.create({
        user_username: userInfo.user_username,
        user_first_name: userInfo.user_first_name,
        user_last_name: userInfo.user_last_name,
        user_phone: userInfo.user_phone,
        user_email: userInfo.user_phone,
        user_password: userInfo.user_password,
        user_avatar: userInfo.user_avatar,
        user_verify_token: userInfo.user_verify_token,
        user_verified: userInfo.user_verified,
        user_blocked: userInfo.user_blocked,
        status_id: userInfo.status_id,
        role_id: userInfo.role_id,
        created_by: userInfo.created_by
      })
      
      user.user_password = undefined;

      return user
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async updateOneUser(userInfo,whereObject){
    try {
      const user = await UserModel.findOne({
        where: whereObject,
      });

      if(!user){ return [] }

      await user.update({
        user_username: userInfo.user_username,
        user_first_name: userInfo.user_first_name,
        user_last_name: userInfo.user_last_name,
        user_phone: userInfo.user_phone,
        user_email: userInfo.user_phone,
        user_password: userInfo.user_password,
        user_avatar: userInfo.user_avatar,
        user_verify_token: userInfo.user_verify_token,
        user_verified: userInfo.user_verified,
        user_blocked: userInfo.user_blocked,
        status_id: userInfo.status_id,
        role_id: userInfo.role_id,
        updated_by: userInfo.updated_by
      });
    
      user.user_password = undefined;
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteOneUser(whereObject){
    try {
      const deletedUser = await UserModel.destroy({
        where: whereObject
      })

      if(!deletedUser){ return [] }
      return deletedUser
    } catch (error) {
      console.log(`error`, error.original)
      return null;
    }
  }
}