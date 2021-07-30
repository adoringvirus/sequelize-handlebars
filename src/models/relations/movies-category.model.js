const Sequelize = require('sequelize');
const { MOVIES_CATEGORY_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const MovieCategoryRelationModel = sequelize.define(MOVIES_CATEGORY_RELATION,{
  movies_id: {
    type: Sequelize.UUID,
  },
  category_id: {
    type: Sequelize.UUID,
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