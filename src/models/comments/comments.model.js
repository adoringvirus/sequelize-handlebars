const globalSqlOptions = require('../global-sql-options');
const MovieModel = require('../movie/movie.model');
const sequelize = require('../../database/database').bootstrap();
const commentDefinition = require('./comment.definition');

const CommentsModel = sequelize.define('comments',
  commentDefinition,
  globalSqlOptions
)

CommentsModel.belongsTo(MovieModel,{
  foreignKey: 'movie_id',
})
MovieModel.hasMany(CommentsModel)

module.exports = CommentsModel;