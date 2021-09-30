const UserRolesModel = require("../models/user-roles/user-roles.model")
const UserStatusModel = require("../models/user-status/user-status.model")

module.exports = {
  async getStatus(_statusName='active'){
    try {
      const userStatus = await UserStatusModel.findOne({where:{
        user_status_name: _statusName
      }})
      
      if(!userStatus) return {data:null,error:true,message:'Status does not exist'}

      return {data:userStatus,error:false}
    
    } catch (error) {
      console.log(`error`, error)
      return {data: null, internalError: true, message: 'Something went wrong'}
    }
  },
  async getRole(_roleName='user'){
    try {
      const userRole = await UserRolesModel.findOne({where:{
        user_role_name: _roleName
      }})
      
      if(!userRole) return {data:null,error:true,message:'Role does not exist'}

      return {data:userRole,error:false}
    
    } catch (error) {
      console.log(`error`, error)
      return {data: null, internalError: true, message: 'Something went wrong'}
    }
  }
}