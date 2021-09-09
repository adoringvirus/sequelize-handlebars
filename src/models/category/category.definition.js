const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  category_name: DataTypes.STRING,
  category_description: DataTypes.STRING,
  ...globalDefinition
}