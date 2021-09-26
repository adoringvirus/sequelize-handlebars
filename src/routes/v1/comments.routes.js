const { Router } = require('express');
const CommentsModel = require('../../models/comments/comments.model');
const { baseRoute } = require('./base.routes');
const commentController = require('../../controller/comment.controller');
const { isParamValid, isValidBody } = require('../../middlewares/validation.middleware');
const { isLoggedIn } = require('../../middlewares/auth.middleware');
const CommentSchema = require('../../validation/CommentSchema');

const CommentsRouter = Router();
const BASE_ROUTE = `/movies/:movieId/comments`;
const isUpdate = true;

CommentsRouter.get(`${BASE_ROUTE}`,isParamValid,commentController.getAllCommentsFromMovie);
CommentsRouter.get(`${BASE_ROUTE}/:commentId`,isParamValid,commentController.getOneCommentFromMovie);
CommentsRouter.post(`${BASE_ROUTE}`,isValidBody(CommentSchema()),isParamValid,isLoggedIn,commentController.creteCommentFromMovie);
CommentsRouter.put(`${BASE_ROUTE}/:commentId`,isValidBody(CommentSchema(isUpdate)),isLoggedIn,isParamValid,commentController.updateCommentFromMovie);
CommentsRouter.delete(`${BASE_ROUTE}/:commentId`,isLoggedIn,isParamValid,commentController.deleteCommentFromMovie);

baseRoute(CommentsRouter,CommentsModel,'comments')

module.exports = CommentsRouter;