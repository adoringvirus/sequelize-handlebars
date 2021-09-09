const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  comment_rating: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  ...globalDefinition
}