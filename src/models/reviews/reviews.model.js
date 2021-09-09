const globalSqlOptions = require('../global-sql-options');
const MovieModel = require('../movie/movie.model');
const reviewDefinition = require('./review.definition');
const sequelize = require('../../database/database').bootstrap();

const ReviewsModel = sequelize.define(
  'reviews',
  reviewDefinition,
  globalSqlOptions
);

ReviewsModel.belongsTo(MovieModel,{
  foreignKey:'movie_id'
})
MovieModel.hasMany(ReviewsModel,{
  sourceKey:'id'
})

module.exports = ReviewsModel;