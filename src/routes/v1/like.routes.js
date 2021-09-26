const { Router } = require('express');
const { like, dislike } = require('../../controller/like.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const LikeModel = require('../../models/like/like.model');
const { baseRoute } = require('./base.routes');


const LikeRoutes = Router();
baseRoute(
  LikeRoutes,
  LikeModel,
  'likes'
)

LikeRoutes.post('/movies/:movieId/likes',isParamValid,like)
LikeRoutes.delete('/movies/:movieId/likes',isParamValid,dislike)

module.exports = LikeRoutes;