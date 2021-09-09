const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')

module.exports = {
  user_status_name: DataTypes.STRING,
  user_status_description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ...globalColumnsDefinition
}