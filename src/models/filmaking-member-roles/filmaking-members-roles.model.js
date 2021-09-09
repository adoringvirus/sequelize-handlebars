const filmakingMemberRolesDefinition = require('./filmaking-members-roles.definition');
const globalSqlOptions = require('../global-sql-options');
const sequelize = require('../../database/database').bootstrap();

const FilmakingMembersRolesModel = sequelize.define('filmaking_members_roles',
  filmakingMemberRolesDefinition,
  globalSqlOptions
)

module.exports = FilmakingMembersRolesModel;