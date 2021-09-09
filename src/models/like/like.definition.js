const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')

module.exports = {
  user_id: DataTypes.INTEGER,
  movie_id: DataTypes.INTEGER,
  ...globalColumnsDefinition
}