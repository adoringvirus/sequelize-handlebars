const Sequelize = require('sequelize');
const { USER_ROLES } = require('../config/database.tables');
const UserModel = require('./user.model');
const sequelize = require('../database/database').bootstrap();

const UserRolesModel = sequelize.define(USER_ROLES,{
  user_role_name: {
    type: Sequelize.STRING
  },
  user_role_description: {
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


UserModel.belongsTo(UserRolesModel,{
  foreignKey: {
    name:'role_id',
    type: Sequelize.DataTypes.UUID
  }
})

UserRolesModel.hasMany(UserModel,{
  foreignKey: {
    name:'role_id',
    type: Sequelize.DataTypes.UUID
  }
})

module.exports = UserRolesModel;