const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  filmaking_member_first_name: {
    type:DataTypes.STRING,
    validate:{
      isLowercase: true, 
    }
  },
  filmaking_member_last_name: {
    type:DataTypes.STRING,
    validate:{
      isLowercase: true, 
    }
  },
  filmaking_member_birth_date: DataTypes.DATE,
  filmaking_member_birth_place: DataTypes.STRING,
  filmaking_member_thumbnail: DataTypes.STRING,
  filmaking_member_bio: DataTypes.STRING,
  ...globalDefinition
}