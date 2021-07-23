const { Router } = require('express');
const ReviewsModel = require('../../models/reviews.model');
const { baseRoute } = require('./base.routes');


const ReviewsRouter = Router();
baseRoute(ReviewsRouter,ReviewsModel,'reviews','movies/reviews')

module.exports = ReviewsRouter;