const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMemberRolesRelationModel = sequelize.define(
  'filmaking_members_and_member_roles_relation',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    filmaking_member_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    filmaking_member_role_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
  },{  
    timestamps: false,
    freezeTableName: true
  })


module.exports = FilmakingMembersMemberRolesRelationModel;