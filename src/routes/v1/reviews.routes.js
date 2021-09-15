const { Router } = require('express');
const { getAllReviewsFromMovie, getOneReviewFromMovie, createReviewFromMovie, updateReviewFromMovie, deleteReviewFromMovie } = require('../../controller/review.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const ReviewsModel = require('../../models/reviews/reviews.model');
const { baseRoute } = require('./base.routes');


const ReviewsRouter = Router();
const BASE_MOVIE_ROUTE = `/movies/:movieId/reviews`

ReviewsRouter.get(`${BASE_MOVIE_ROUTE}`,isParamValid, getAllReviewsFromMovie);
ReviewsRouter.get(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,getOneReviewFromMovie);
ReviewsRouter.post(`${BASE_MOVIE_ROUTE}`,isParamValid,createReviewFromMovie);
ReviewsRouter.put(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,updateReviewFromMovie);
ReviewsRouter.delete(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,deleteReviewFromMovie);

baseRoute(ReviewsRouter,ReviewsModel,'reviews')

module.exports = ReviewsRouter;