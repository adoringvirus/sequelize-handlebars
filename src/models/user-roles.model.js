const Sequelize = require('sequelize');
const { USER_ROLES } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const UserRoles = sequelize.define(USER_ROLES,{
  user_roles_name: {
    type: Sequelize.STRING
  },
  user_roles_description: {
    type: Sequelize.STRING
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
})

module.exports = UserRoles;