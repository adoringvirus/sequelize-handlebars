const Sequelize = require('sequelize');
const { MOVIES } = require('../config/database.tables');
const CategoryModel = require('./category.model');
const MovieCategoryRelationModel = require('./relations/movies-category.model');
const sequelize = require('../database/database').bootstrap();

const MovieModel = sequelize.define(MOVIES,{
  movie_title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  movie_rating: {
    type: Sequelize.INTEGER,
  },
  like_count: {
    type: Sequelize.INTEGER
  },
  movie_description: {
    type: Sequelize.STRING
  },
  movie_release_date: {
    type: Sequelize.DATE
  },
  movie_url: {
    type: Sequelize.STRING
  },
  movie_thumbnail: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  },
  created_by: {
    type: Sequelize.UUID
  },
  updated_by: {
    type: Sequelize.UUID
  }
},{ 
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  updatedAt: "updated_at",
  createdAt: "created_at"
})

MovieModel.belongsToMany(CategoryModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'movie_id'
})

CategoryModel.belongsToMany(MovieModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'category_id'
})




module.exports = MovieModel;