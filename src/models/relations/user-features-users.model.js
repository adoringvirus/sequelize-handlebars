const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const UsersFeaturesRelationModel = sequelize.define('user_features_users_relation',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
  user_feature_id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
},{
  timestamps: false,
  freezeTableName: true
})


module.exports = UsersFeaturesRelationModel;