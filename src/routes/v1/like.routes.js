const { Router } = require('express');
const FilmakingMembersRolesModel = require('../../models/filmaking-members-roles.model');
const LikeModel = require('../../models/like.model');
const { baseRoute } = require('./base.routes');


const LikeRoutes = Router();
baseRoute(
  LikeRoutes,
  LikeModel,
  'roles',
  'likes'
)

module.exports = LikeRoutes;