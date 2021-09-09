const FilmakingMembersRolesModel = require('../filmaking-member-roles/filmaking-members-roles.model');
const globalSqlOptions = require('../global-sql-options');
const MovieModel = require('../movie/movie.model');
const FilmakingMembersMoviesRelationModel = require('../relations/filmaking-member-movies.model');
const FilmakingMembersMemberRolesRelationModel = require('../relations/filmaking-members-roles.model');
const filmakingMembersDefinition = require('./filmaking-members.definition');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersModel = sequelize.define(
  'filmaking_members',
  filmakingMembersDefinition,
  globalSqlOptions
)

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