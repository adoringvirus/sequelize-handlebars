const { Router } = require('express');
const FilmakingMembersRolesModel = require('../../models/filmaking-members-roles.model');
const { baseRoute } = require('./base.routes');


const FilmakingMembersRolesRouter = Router();
baseRoute(
  FilmakingMembersRolesRouter,
  FilmakingMembersRolesModel,
  'filmaking-members-roles',
  'movies/filmaking-members-roles'
)

module.exports = FilmakingMembersRolesRouter;