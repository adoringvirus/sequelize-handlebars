const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  filmaking_member_first_name: DataTypes.STRING,
  filmaking_member_last_name: DataTypes.STRING,
  filmaking_member_birth_date: DataTypes.DATE,
  filmaking_member_birth_place: DataTypes.STRING,
  filmaking_member_thumbnail: DataTypes.STRING,
  filmaking_member_bio: DataTypes.STRING,
  ...globalDefinition
}