const { Router } = require('express');
const FilmakingMembersModel = require('../../models/filmaking-members.model');
const { baseRoute } = require('./base.routes');


const FilmakingMembersRouter = Router();
baseRoute(
  FilmakingMembersRouter,
  FilmakingMembersModel,
  'filmaking-members',
  'movies/filmaking-members'
)

module.exports = FilmakingMembersRouter;