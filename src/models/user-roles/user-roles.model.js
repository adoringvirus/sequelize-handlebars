const { DataTypes } = require('sequelize');
const globalSqlOptions = require('../global-sql-options');
const UserModel = require('../user/user.model');
const userRolesDefinition = require('./user-roles.definition');
const sequelize = require('../../database/database').bootstrap();

const UserRolesModel = sequelize.define(
  'user_roles',
  userRolesDefinition,
  {
    paranoid:true,
    ...globalSqlOptions
  })


UserModel.belongsTo(UserRolesModel,{
  foreignKey: {
    name:'role_id',
    type: DataTypes.UUID
  }
})

UserRolesModel.hasMany(UserModel,{
  foreignKey: {
    name:'role_id',
    type: DataTypes.UUID
  }
})

module.exports = UserRolesModel;