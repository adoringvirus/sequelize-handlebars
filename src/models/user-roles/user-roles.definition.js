const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')

module.exports = {
  user_role_name: DataTypes.STRING,
  user_role_description: DataTypes.STRING,
  ...globalColumnsDefinition
}