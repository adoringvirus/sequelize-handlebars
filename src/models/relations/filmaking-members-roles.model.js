const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMemberRolesRelationModel = sequelize.define(
  'filmaking_members_and_member_roles_relation',{
    filmaking_member_id: DataTypes.INTEGER,
    filmaking_member_role_id:  DataTypes.INTEGER,
  },{  
    timestamps: false,
    freezeTableName: true
  })


module.exports = FilmakingMembersMemberRolesRelationModel;