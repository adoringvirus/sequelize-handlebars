const { Router } = require('express');
const CommentsModel = require('../../models/comments.model');
const { baseRoute } = require('./base.routes');
const commentController = require('../../controller/comment.controller');

const CommentsRouter = Router();
const BASE_ROUTE = `/movies/:movieId/comments`;

CommentsRouter.get(`${BASE_ROUTE}`,commentController.getAllCommentsFromMovie);
CommentsRouter.get(`${BASE_ROUTE}/:commentId`,commentController.getOneCommentFromMovie);
CommentsRouter.post(`${BASE_ROUTE}`,commentController.creteCommentFromMovie);
CommentsRouter.put(`${BASE_ROUTE}/:commentId`,commentController.updateCommentFromMovie);
CommentsRouter.delete(`${BASE_ROUTE}/:commentId`,commentController.deleteCommentFromMovie);

baseRoute(CommentsRouter,CommentsModel,'comments')

module.exports = CommentsRouter;