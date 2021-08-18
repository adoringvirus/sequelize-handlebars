const { Router } = require('express');
const { getAllReviewsFromMovie, getOneReviewFromMovie, createReviewFromMovie, updateReviewFromMovie, deleteReviewFromMovie } = require('../../controller/review.controller');
const ReviewsModel = require('../../models/reviews.model');
const { baseRoute } = require('./base.routes');


const ReviewsRouter = Router();
const BASE_MOVIE_ROUTE = `/movies/:movieId/reviews`

ReviewsRouter.get(`/${BASE_MOVIE_ROUTE}`,getAllReviewsFromMovie);
ReviewsRouter.get(`${BASE_MOVIE_ROUTE}/:reviewId`,getOneReviewFromMovie);
ReviewsRouter.post(`${BASE_MOVIE_ROUTE}`,createReviewFromMovie);
ReviewsRouter.put(`${BASE_MOVIE_ROUTE}/:reviewId`,updateReviewFromMovie);
ReviewsRouter.delete(`${BASE_MOVIE_ROUTE}/:reviewId`,deleteReviewFromMovie);

baseRoute(ReviewsRouter,ReviewsModel,'reviews')

module.exports = ReviewsRouter;