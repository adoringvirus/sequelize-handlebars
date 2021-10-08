const { Model } = require('sequelize');
const globalSqlOptions = require('../global-sql-options');
const userStatusDefinition = require('./user-status.definition');
const sequelize = require('../../database/database').bootstrap();

class UserStatusModel extends Model {}
UserStatusModel.init(userStatusDefinition,{
  sequelize,
  paranoid: true,
  deletedAt: 'deleted_at',
  ...globalSqlOptions,
  modelName:'user_statuses',
})


module.exports = UserStatusModel;