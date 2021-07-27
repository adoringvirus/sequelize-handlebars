const Sequelize = require('sequelize');
const { CATEGORY } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const CategoryModel = sequelize.define(CATEGORY,{
  category_name: {
    type: Sequelize.STRING
  },
  category_description: {
    type: Sequelize.STRING
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

module.exports = CategoryModel;