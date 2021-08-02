const Sequelize = require('sequelize');
const { USER_FEATURES_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const UsersFeaturesRelationModel = sequelize.define(USER_FEATURES_RELATION,{
  user_id: {
    type: Sequelize.INTEGER,
  },
  user_feature_id: {
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


module.exports = UsersFeaturesRelationModel;