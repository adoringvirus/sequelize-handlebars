const { DataTypes } = require("sequelize")
const globalDefinition = require('../global-columns-definition');

module.exports  = {
  user_username:   DataTypes.STRING,
  user_first_name: {
    allowNull: false,
    type:  DataTypes.STRING
  },
  user_last_name:{
    allowNull: false,
    type:  DataTypes.STRING
  },
  user_phone:  DataTypes.STRING,
  user_email: {
    allowNull: false,
    type:  DataTypes.STRING,
    validate:{
      isEmail: true,
    },
    unique: true
  },
  user_password: {
    allowNull: false,
    type:  DataTypes.STRING
  },
  user_avatar:   DataTypes.STRING,
  user_verify_token:   DataTypes.STRING,
  user_last_login_at:   DataTypes.DATE,
  user_last_ip_address:   DataTypes.STRING,
  role_id:   DataTypes.INTEGER,
  status_id:   DataTypes.INTEGER,
  ...globalDefinition
}