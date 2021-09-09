const globalSqlOptions = require('../global-sql-options');
const MovieModel = require('../movie/movie.model');
const likeDefinition = require('./like.definition');
const sequelize = require('../../database/database').bootstrap();

const LikeModel = sequelize.define(
  'likes',
  likeDefinition,
  globalSqlOptions
)

LikeModel.belongsTo(MovieModel,{
  foreignKey: 'movie_id',
})
MovieModel.hasMany(LikeModel);


module.exports = LikeModel;