const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS_ROLES } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const FilmakingMembersRolesModel = sequelize.define(FILMAKING_MEMBERS_ROLES,{
  filmaking_member_role_name: {
    type: Sequelize.STRING
  },
  filmaking_member_role_description: {
    type: Sequelize.STRING
  },
  filmaking_member_role_thumbnail: {
    type: Sequelize.STRING
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

module.exports = FilmakingMembersRolesModel;