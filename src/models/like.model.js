const Sequelize = require('sequelize');
const { LIKES } = require('../config/database.tables');
const MovieModel = require('./movie/movie.model');
const sequelize = require('../database/database').bootstrap();

const LikeModel = sequelize.define(LIKES,{
  user_id: {
    type: Sequelize.INTEGER
  },
  movie_id: {
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

LikeModel.belongsTo(MovieModel,{
  foreignKey: 'movie_id',
})
MovieModel.hasMany(LikeModel);


module.exports = LikeModel;