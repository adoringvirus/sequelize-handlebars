const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  filmaking_member_role_name: {
    type:DataTypes.STRING,
    validate:{
      unique: true,
      isLowercase: true, 
    }
  },
  filmaking_member_role_description: DataTypes.STRING,
  filmaking_member_role_thumbnail: DataTypes.STRING,
  ...globalDefinition
}