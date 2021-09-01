const { MOVIES } = require('../../config/database.tables');
const CategoryModel = require('../category.model');
const MovieCategoryRelationModel = require('../relations/movies-category.model');
const sequelize = require('../../database/database').bootstrap();
const globalSequelizeOptions = require('../global-sql-options');
const MovieModelDefinition = require('./movie.definition');

const MovieModel = sequelize.define(
  MOVIES,
  MovieModelDefinition,
  globalSequelizeOptions
)

MovieModel.belongsToMany(CategoryModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'movie_id'
})

CategoryModel.belongsToMany(MovieModel,{
  through: MovieCategoryRelationModel,
  foreignKey:'category_id'
})


module.exports = MovieModel;