const Sequelize = require('sequelize');
const { USER_FEATURES } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const UserFeaturesModel = sequelize.define(USER_FEATURES,{
  user_feature_name: {
    type: Sequelize.STRING
  },
  user_feature_description: {
    type: Sequelize.STRING
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

module.exports = UserFeaturesModel;