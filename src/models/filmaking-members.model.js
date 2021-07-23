const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const FilmakingMembersModel = sequelize.define(FILMAKING_MEMBERS,{
  filmaking_members_first_name: {
    type: Sequelize.STRING
  },
  filmaking_members_last_name: {
    type: Sequelize.STRING
  },
  filmaking_members_birth_date: {
    type: Sequelize.DATE
  },
  filmaking_members_birth_place: {
    type: Sequelize.STRING
  },
  filmaking_members_thumbnail: {
    type: Sequelize.STRING
  },
  filmaking_members_bio: {
    type: Sequelize.STRING
  },
  filmaking_members_role_id: {
    type: Sequelize.UUID
  },
  filmaking_members_created_at: {
    type: Sequelize.DATE
  },
  filmaking_members_updated_at: {
    type: Sequelize.STRING
  },
  filmaking_members_created_by: {
    type: Sequelize.UUID
  },
  filmaking_members_updated_by: {
    type: Sequelize.UUID
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

module.exports = FilmakingMembersModel;