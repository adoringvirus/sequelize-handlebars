const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  review_description: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  movie_id: DataTypes.INTEGER,
  ...globalDefinition
}