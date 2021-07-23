const Sequelize = require('sequelize');
const { USERS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const UserModel = sequelize.define(USERS,{
  users_username: {
    type: Sequelize.STRING
  },
  users_first_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  users_last_name:{
    allowNull: false,
    type: Sequelize.STRING
  },
  users_phone:{
    type: Sequelize.STRING
  },
  users_email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  users_password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  users_avatar: {
    type: Sequelize.STRING
  },
  users_last_login_at: {
    type: Sequelize.DATE
  },
  users_last_ip_address: {
    type: Sequelize.STRING
  },
  users_roles_id: {
    type: Sequelize.DATE
  },
  users_status_id: {
    type: Sequelize.DATE,
  },
  users_created_at: {
    type: Sequelize.DATE
  },
  users_updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  },
  users_created_by: {
    type: Sequelize.DATE
  },
  users_updated_by: {
    type: Sequelize.DATE
  }
},{ 
  getterMethods: {
    fullName() {
      return this.users_first_name + ' ' + this.users_last_name;
    }
  },
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    }
  },
  timestamps: false,
  freezeTableName: true
})

module.exports = UserModel