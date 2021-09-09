const { Router } = require('express');
const CommentsModel = require('../../models/comments/comments.model');
const { baseRoute } = require('./base.routes');
const commentController = require('../../controller/comment.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');

const CommentsRouter = Router();
const BASE_ROUTE = `/movies/:movieId/comments`;

CommentsRouter.get(`${BASE_ROUTE}`,isParamValid,commentController.getAllCommentsFromMovie);
CommentsRouter.get(`${BASE_ROUTE}/:commentId`,isParamValid,commentController.getOneCommentFromMovie);
CommentsRouter.post(`${BASE_ROUTE}`,isParamValid,commentController.creteCommentFromMovie);
CommentsRouter.put(`${BASE_ROUTE}/:commentId`,isParamValid,commentController.updateCommentFromMovie);
CommentsRouter.delete(`${BASE_ROUTE}/:commentId`,isParamValid,commentController.deleteCommentFromMovie);

baseRoute(CommentsRouter,CommentsModel,'comments')

module.exports = CommentsRouter;