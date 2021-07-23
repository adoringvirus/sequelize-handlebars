const Sequelize = require('sequelize');
const { USER_STATUS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const UserStatusModel = sequelize.define(USER_STATUS,{
  user_status_name: {
    type: Sequelize.STRING
  },
  user_status_description: {
    allowNull: false,
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

module.exports = UserStatusModel