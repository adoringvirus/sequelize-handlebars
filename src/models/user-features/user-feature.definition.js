const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')


module.exports = {
  user_feature_name: DataTypes.STRING,
  user_feature_description: DataTypes.STRING,
  ...globalColumnsDefinition
}