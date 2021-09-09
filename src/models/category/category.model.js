const sequelize = require('../../database/database').bootstrap();
const categoryDefinition = require('./category.definition');
const globalSqlOptions = require('../global-sql-options');

const CategoryModel = sequelize.define(
  'categories',
  categoryDefinition,
  globalSqlOptions
)

module.exports = CategoryModel;