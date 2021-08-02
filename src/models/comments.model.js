const Sequelize = require('sequelize');
const { COMMENTS } = require('../config/database.tables');
const MovieModel = require('./movie.model');
const sequelize = require('../database/database').bootstrap();

const CommentsModel = sequelize.define(COMMENTS,{
  comment_rating: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  },
  created_by: {
    type: Sequelize.INTEGER
  },
  updated_by: {
    type: Sequelize.INTEGER
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

CommentsModel.belongsTo(MovieModel,{
  foreignKey: 'movie_id',
})
MovieModel.hasMany(CommentsModel)

module.exports = CommentsModel;