const Sequelize = require('sequelize');
const { REVIEWS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const ReviewsModel = sequelize.define(REVIEWS,{
  reviews_name: {
    type: Sequelize.STRING
  },
  reviews_description: {
    type: Sequelize.STRING
  },
  reviews_created_at:{
    type: Sequelize.DATE
  },
  reviews_updated_at:{
    type: Sequelize.DATE
  },
  reviews_created_by:{
    type: Sequelize.UUID
  },
  reviews_updated_by:{
    type: Sequelize.UUID
  },

},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
})

module.exports = ReviewsModel;