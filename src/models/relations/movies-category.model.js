const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const MovieCategoryRelationModel = sequelize.define('movies_categories_relation',{
  movie_id:DataTypes.INTEGER,
  category_id: DataTypes.INTEGER,
},{
  timestamps: false,
  freezeTableName: true  
})



module.exports = MovieCategoryRelationModel;