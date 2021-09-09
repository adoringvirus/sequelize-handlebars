const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const UsersFeaturesRelationModel = sequelize.define('user_features_users_relation',{
  user_id: DataTypes.INTEGER,
  user_feature_id: DataTypes.INTEGER,
},{
  timestamps: false,
  freezeTableName: true
})


module.exports = UsersFeaturesRelationModel;