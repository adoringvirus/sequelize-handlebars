const Sequelize = require('sequelize');
const { USER_FEATURES } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const UserFeaturesModel = sequelize.define(USER_FEATURES,{
  user_features_name: {
    type: Sequelize.STRING
  },
  user_features_description: {
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