const { Router } = require('express');
const { like, dislike } = require('../../controller/like.controller');
const LikeModel = require('../../models/like/like.model');
const { baseRoute } = require('./base.routes');


const LikeRoutes = Router();
baseRoute(
  LikeRoutes,
  LikeModel,
  'likes'
)

LikeRoutes.post('/movies/:movieId/likes',like)
LikeRoutes.delete('/movies/:movieId/likes',dislike)

module.exports = LikeRoutes;