const Sequelize = require('sequelize');
const { REVIEWS } = require('../config/database.tables');
const MovieModel = require('./movie.model');
const sequelize = require('../database/database').bootstrap();

const ReviewsModel = sequelize.define(REVIEWS,{
  review_name: {
    type: Sequelize.STRING
  },
  review_description: {
    type: Sequelize.STRING
  },
  created_at:{
    type: Sequelize.DATE
  },
  updated_at:{
    type: Sequelize.DATE
  },
  created_by:{
    type: Sequelize.INTEGER
  },
  updated_by:{
    type: Sequelize.INTEGER
  },

},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
});

ReviewsModel.belongsTo(MovieModel,{
  foreignKey:'movie_id'
})
MovieModel.hasMany(ReviewsModel)

module.exports = ReviewsModel;