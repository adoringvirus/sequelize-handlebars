const Sequelize = require('sequelize');
const { FILMAKING_MEMBERS } = require('../config/database.tables');
const FilmakingMembersRolesModel = require('./filmaking-members-roles.model');
const MovieModel = require('./movie/movie.model');
const FilmakingMembersMoviesRelationModel = require('./relations/filmaking-member-movies.model');
const FilmakingMembersMemberRolesRelationModel = require('./relations/filmaking-members-roles.model');
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
  filmaking_member_thumbnail: {
    type: Sequelize.STRING
  },
  filmaking_member_bio: {
    type: Sequelize.STRING
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

FilmakingMembersModel.belongsToMany(FilmakingMembersRolesModel,{
  through: FilmakingMembersMemberRolesRelationModel,
  foreignKey:'filmaking_member_id',
})

FilmakingMembersRolesModel.belongsToMany(FilmakingMembersModel,{
  through: FilmakingMembersMemberRolesRelationModel,
  foreignKey:'filmaking_member_role_id',
})


FilmakingMembersModel.belongsToMany(MovieModel,{
  through: FilmakingMembersMoviesRelationModel,
  foreignKey:'filmaking_member_id',
})

MovieModel.belongsToMany(FilmakingMembersModel,{
  through: FilmakingMembersMoviesRelationModel,
  foreignKey:'movie_id',
})

module.exports = FilmakingMembersModel;