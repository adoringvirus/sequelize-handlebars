const Sequelize = require('sequelize');
const { MOVIES_CATEGORIES_RELATION: MOVIES_CATEGORY_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const MovieCategoryRelationModel = sequelize.define(MOVIES_CATEGORY_RELATION,{
  movie_id: {
    type: Sequelize.INTEGER,
  },
  category_id: {
    type: Sequelize.INTEGER,
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
})



module.exports = MovieCategoryRelationModel;