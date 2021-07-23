const { Router } = require('express');
const CommentsModel = require('../../models/comments.model');
const { baseRoute } = require('./base.routes');


const CommentsRouter = Router();
baseRoute(CommentsRouter,CommentsModel,'comments','movies/comments')

module.exports = CommentsRouter;