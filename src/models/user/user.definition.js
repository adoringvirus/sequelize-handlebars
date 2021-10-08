const { DataTypes } = require("sequelize")
const globalDefinition = require('../global-columns-definition');

module.exports  = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_username:   {
    type:DataTypes.STRING,
    unique: true,
  },
  user_first_name: {
    allowNull: false,
    type:  DataTypes.STRING,
    validate:{
      isLowercase: true, 
    }
  },
  user_last_name:{
    allowNull: false,
    type:  DataTypes.STRING,
    validate:{
      isLowercase: true, 
    }
  },
  user_phone:  DataTypes.STRING,
  user_email: {
    allowNull: false,
    type:  DataTypes.STRING,
    validate:{
      isEmail: true,
      isLowercase: true,
    },
    unique: true
  },
  user_password: {
    allowNull: false,
    type:  DataTypes.STRING
  },
  user_verified: {
    type:DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_blocked: {
    type:DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_avatar:   DataTypes.STRING,
  user_verify_token:   DataTypes.STRING,
  user_last_login_at:   DataTypes.DATE,
  user_last_ip_address:   DataTypes.STRING,
  role_id:   DataTypes.INTEGER,
  status_id:   DataTypes.INTEGER,
  deleted_at: DataTypes.DATE,
  deleted_by: DataTypes.INTEGER,
  ...globalDefinition
}