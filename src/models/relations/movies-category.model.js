const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const MovieCategoryRelationModel = sequelize.define('movies_categories_relation',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  movie_id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
  category_id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
},{
  timestamps: false,
  freezeTableName: true  
})



module.exports = MovieCategoryRelationModel;