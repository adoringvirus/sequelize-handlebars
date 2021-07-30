const Sequelize = require('sequelize');
const { COMMENTS } = require('../config/database.tables');
const MovieModel = require('./movie.model');
const UserMovieCommentsRelation = require('./relations/users-movies-comments.model');
const sequelize = require('../database/database').bootstrap();

const CommentsModel = sequelize.define(COMMENTS,{
  comments_rating: {
    type: Sequelize.INTEGER
  },
  comments_comment: {
    type: Sequelize.STRING
  },
  comments_created_at: {
    type: Sequelize.DATE
  },
  comments_updated_at: {
    type: Sequelize.DATE
  },
  comments_created_by: {
    type: Sequelize.UUID
  },
  comments_updated_by: {
    type: Sequelize.UUID
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true,
  underscored: true,
})

CommentsModel.belongsToMany(MovieModel,{
  through: UserMovieCommentsRelation,
  foreignKey: 'comments_id',
})

// UserModel.belongsToMany(CommentsModel,{
//   through: UserMovieCommentsRelation,
//   foreignKey: 'comments_id',
// })

MovieModel.belongsToMany(CommentsModel,{
  through: UserMovieCommentsRelation,
  foreignKey: 'movies_id',
})

module.exports = CommentsModel;