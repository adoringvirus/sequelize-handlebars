const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  filmaking_member_role_name: DataTypes.STRING,
  filmaking_member_role_description: DataTypes.STRING,
  filmaking_member_role_thumbnail: DataTypes.STRING,
  ...globalDefinition
}