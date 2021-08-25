const UserModel = require('../models/user.model');
const UserRolesModel = require('../models/user-roles.model');
const UserStatusModel = require('../models/user-status.model');
const UserFeaturesModel = require('../models/user-features.model');
const { nanoid } = require('nanoid')
module.exports = {
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
  async createUser(userInfo){

    const { 
      user_username,
      user_first_name,
      user_last_name,
      user_phone,
      user_email,
      user_password,
      user_avatar,
      user_verify_email,
      role_id = 2, // * Inactive by default
      status_id = 2, // * user by default
      user_verify_token = nanoid()
    } = userInfo;
    
    try {
      
      const user = await UserModel.create({
        user_username,
        user_first_name,
        user_last_name,
        user_phone,
        user_email,
        user_password,
        user_avatar,
        user_verify_token,
        status_id,
        role_id
      })
      user.user_password = undefined;

      return user
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async updateUser(userInfo,whereObject){

    const user = await UserModel.findOne({
      where: whereObject,
    });

    await user.update(userInfo);
    
    try {
      user.user_password = undefined;
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
}