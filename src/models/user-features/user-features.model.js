const globalSqlOptions = require('../global-sql-options');
const userFeatureDefinition = require('./user-feature.definition');
const sequelize = require('../../database/database').bootstrap();

const UserFeaturesModel = sequelize.define(
  'user_features',
  userFeatureDefinition,
  {
    paranoid:true,
    ...globalSqlOptions
  })

module.exports = UserFeaturesModel;