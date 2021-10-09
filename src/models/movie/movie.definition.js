const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  movie_title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  movie_rating: {
    type:DataTypes.INTEGER,
    validation:{
      len: [0,5]
    }
  },
  like_count: DataTypes.INTEGER,
  movie_description: DataTypes.STRING,
  movie_release_date: DataTypes.DATE,
  movie_url: DataTypes.STRING,
  movie_thumbnail: DataTypes.STRING,
  ...globalDefinition
}