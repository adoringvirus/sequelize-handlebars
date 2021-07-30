const Sequelize = require('sequelize');
const { MOVIES } = require('../config/database.tables');
const CategoryModel = require('./category.model');
const MovieCategoryRelationModel = require('./relations/movies-category.model');
const UserMovieCommentsRelation = require('./relations/users-movies-comments.model');
// const UserModel = require('./user.model');
const sequelize = require('../database/database').bootstrap();

const MovieModel = sequelize.define(MOVIES,{
  movies_title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  movies_rating: {
    type: Sequelize.INTEGER,
  },
  movies_description: {
    type: Sequelize.STRING
  },
  movies_release_date: {
    type: Sequelize.DATE
  },
  movies_url: {
    type: Sequelize.STRING
  },
  movies_thumbnail: {
    type: Sequelize.STRING
  },
  movies_created_at: {
    type: Sequelize.DATE
  },
  movies_updated_at: {
    type: Sequelize.DATE
  },
  movies_created_by: {
    type: Sequelize.UUID
  },
  movies_updated_by: {
    type: Sequelize.UUID
  }
},{ 
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    }
  },
  timestamps: false,
  freezeTableName: true
})

MovieModel.belongsToMany(CategoryModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'movies_id'
})

CategoryModel.belongsToMany(MovieModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'category_id'
})





module.exports = MovieModel;