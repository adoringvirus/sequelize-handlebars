const Sequelize = require('sequelize');
const { USER_FEATURES_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const UsersFeaturesRelationModel = sequelize.define(USER_FEATURES_RELATION,{
  users_id: {
    type: Sequelize.UUID,
  },
  user_features_id: {
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

// UsersFeaturesRelationModel.hasMany(UserModel,{
//   foreignKey: 'id'
// });


// UsersFeaturesRelationModel.hasMany(UserFeaturesModel,{
//   foreignKey:'id'
// });


module.exports = UsersFeaturesRelationModel;