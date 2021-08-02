const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

const FilmakingMembersModel = sequelize.define(FILMAKING_MEMBERS,{
  filmaking_member_first_name: {
    type: Sequelize.STRING
  },
  filmaking_member_last_name: {
    type: Sequelize.STRING
  },
  filmaking_member_birth_date: {
    type: Sequelize.DATE
  },
  filmaking_member_birth_place: {
    type: Sequelize.STRING
  },
  filmaking_member__thumbnail: {
    type: Sequelize.STRING
  },
  filmaking_member__bio: {
    type: Sequelize.STRING
  },
  role_id: {
    type: Sequelize.UUID
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.STRING
  },
  created_by: {
    type: Sequelize.INTEGER
  },
  updated_by: {
    type: Sequelize.INTEGER
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