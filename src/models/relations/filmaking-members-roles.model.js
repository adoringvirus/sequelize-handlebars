const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS_AND_MEMBERS_ROLES_RELATION } = require('../../config/database.tables');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersMemberRolesRelationModel = sequelize.define(FILMAKING_MEMBERS_AND_MEMBERS_ROLES_RELATION,{
  filmaking_member_id: {
    type: Sequelize.INTEGER,
  },
  filmaking_member_role_id: {
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


module.exports = FilmakingMembersMemberRolesRelationModel;