const { Router } = require('express');
const { getAllReviewsFromMovie, getOneReviewFromMovie, createReviewFromMovie, updateReviewFromMovie, deleteReviewFromMovie } = require('../../controller/review.controller');
const ReviewsModel = require('../../models/reviews.model');
const { baseRoute } = require('./base.routes');


const ReviewsRouter = Router();

ReviewsRouter.get('/movies/:movieId/reviews',getAllReviewsFromMovie);
ReviewsRouter.get('/movies/:movieId/reviews/:reviewId',getOneReviewFromMovie);
ReviewsRouter.post('/movies/:movieId/reviews',createReviewFromMovie);
ReviewsRouter.put('/movies/:movieId/reviews/:reviewId',updateReviewFromMovie);
ReviewsRouter.delete('/movies/:movieId/reviews/:reviewId',deleteReviewFromMovie);

baseRoute(ReviewsRouter,ReviewsModel,'reviews','reviews')

module.exports = ReviewsRouter;