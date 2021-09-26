const { Router } = require('express');
const { getAllReviewsFromMovie, getOneReviewFromMovie, createReviewFromMovie, updateReviewFromMovie, deleteReviewFromMovie } = require('../../controller/review.controller');
const { isLoggedIn } = require('../../middlewares/auth.middleware');
const { isParamValid,isValidBody } = require('../../middlewares/validation.middleware');
const ReviewsModel = require('../../models/reviews/reviews.model');
const { baseRoute } = require('./base.routes');
const ReviewSchema = require('../../validation/ReviewSchema');


const ReviewsRouter = Router();
const BASE_MOVIE_ROUTE = `/movies/:movieId/reviews`
const isUpdate = true;

ReviewsRouter.get(`${BASE_MOVIE_ROUTE}`,isParamValid, getAllReviewsFromMovie);
ReviewsRouter.get(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,getOneReviewFromMovie);
ReviewsRouter.post(`${BASE_MOVIE_ROUTE}`,isParamValid,isLoggedIn,createReviewFromMovie);
ReviewsRouter.put(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,isLoggedIn,updateReviewFromMovie);
ReviewsRouter.delete(`${BASE_MOVIE_ROUTE}/:reviewId`,isParamValid,isLoggedIn,deleteReviewFromMovie);

baseRoute(ReviewsRouter,ReviewsModel,'reviews',{
  postOptions: { 
    postMiddlewares: [isValidBody(ReviewSchema())] 
  },
  putOptions: { 
    putMiddlewares: [isValidBody(ReviewSchema(isUpdate))] 
  }
})

module.exports = ReviewsRouter;