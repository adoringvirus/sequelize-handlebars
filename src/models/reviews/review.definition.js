const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  review_description: DataTypes.STRING,
  user_id:{
    type:DataTypes.INTEGER,
    primaryKey: true,
  },
  movie_id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
  },
  ...globalDefinition
}