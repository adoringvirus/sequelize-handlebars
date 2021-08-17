const { Router } = require('express');
const LikeModel = require('../../models/like.model');
const { baseRoute } = require('./base.routes');


const LikeRoutes = Router();
baseRoute(
  LikeRoutes,
  LikeModel,
  'likes'
)

module.exports = LikeRoutes;