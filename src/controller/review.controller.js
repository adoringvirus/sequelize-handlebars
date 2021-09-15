const { RESPONSES } = require("../responses/response");
const { 
  findAllReviewsFromMovie, 
  findOneReviewFromMovie, 
  createOneReviewForMovie, 
  updateOneReviewsForMovie, 
  deleteOneReviewFromMovie
} = require("../services/review.service");


module.exports  = {
  async getAllReviewsFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const reviews = await findAllReviewsFromMovie(movieId);

    if(reviews.length === 0 ) return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'No reviews yet',
      data: []
    })

    if(!reviews) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred finding reviews',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Reviews found',
      data: reviews
    })
  },
  async getOneReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;
    const review = await findOneReviewFromMovie(reviewId,movieId);

    if(review === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or review',
      error: true,
      data: null
    })

    if(review === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred finding review',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Review found',
      data: review
    })
  },
  async createReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const createdReview = await createOneReviewForMovie({
      movieId,
      userId: req.session.passport.user.id
    },req.body)

    if(!createdReview) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred creating the review',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: 'Review created',
      data: createdReview
    })
  },
  async updateReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;

    const updatedReview = await updateOneReviewsForMovie({
      reviewId,
      movieId
    },{
      ...req.body,
      updated_by: req.session.passport.user.id
    });

    if(updatedReview === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or review',
      error: true,
      data: null
    })

    if(updatedReview === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred updating review',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Review updated',
      data: updatedReview
    })
  },
  async deleteReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;
    const deletedReview = await deleteOneReviewFromMovie(reviewId,movieId);

    if(deletedReview === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or review',
      error: true,
      data: null
    })

    if(deletedReview === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred deleting review',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Review deleted',
      data: deletedReview
    })
  }
}