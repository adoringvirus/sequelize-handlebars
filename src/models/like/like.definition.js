const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    primaryKey: true,
    type:DataTypes.INTEGER
  },
  movie_id: {
    primaryKey: true,
    type:DataTypes.INTEGER
  },
  ...globalColumnsDefinition
}