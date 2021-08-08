const { Router } = require('express');
const CommentsModel = require('../../models/comments.model');
const { baseRoute } = require('./base.routes');
const commentController = require('../../controller/comment.controller');

const CommentsRouter = Router();
CommentsRouter.get('/movies/:movieId/comments',commentController.getAllCommentsFromMovie);
CommentsRouter.get('/movies/:movieId/comments/:commentId',commentController.getOneCommentFromMovie);
CommentsRouter.post('/movies/:movieId/comments',commentController.creteCommentFromMovie);
CommentsRouter.put('/movies/:movieId/comments/:commentId',commentController.updateCommentFromMovie);
CommentsRouter.delete('/movies/:movieId/comments/:commentId',commentController.deleteCommentFromMovie);

baseRoute(CommentsRouter,CommentsModel,'comments','comments')

module.exports = CommentsRouter;