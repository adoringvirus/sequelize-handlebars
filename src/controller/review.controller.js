const MovieModel = require("../models/movie.model");
const ReviewsModel = require("../models/reviews.model");


module.exports  = {
  async getAllReviewsFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;

    try {
      const reviews  = await ReviewsModel.findAll({
        // include: MovieModel,
        where:{
          movie_id: movieId
        },
      });
    
      if( reviews.length === 0 ) res.status(400).json({
        message:'',
        status: '',
        error: 'review does not exist'
      });
  
      res.status(200).json({
        message:'',
        data:reviews
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },


  async getOneReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;

    try {
      const review  = await ReviewsModel.findOne({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !review ) return res.status(400).json({
        message:'',
        status: '',
        error: 'review does not exist'
      });
  
      res.status(200).json({
        message:'',
        data:review
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async createReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    // const { } = req.body
    try {
      const newReview  = await ReviewsModel.create({
        ...req.body,
        movie_id: movieId,
        user_id: 2
      });
      
      res.status(200).json({
        message:'',
        data:newReview
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async updateReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;

    try {
      const review  = await ReviewsModel.findOne({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !review ) return res.status(400).json({
        message:'',
        status: '',
        error: 'review does not exist'
      });
  
      const updatedReview = await review.update(req.body);

      res.status(200).json({
        message:'',
        data:updatedReview
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async deleteReviewFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,reviewId } = req.params;

    try {
      const deletedReview  = await ReviewsModel.destroy({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !deletedReview ) return res.status(400).json({
        message:'',
        status: '',
        error: 'review does not exist'
      });
      
      res.status(200).json({
        message:`review ${deletedReview} was deleted`,
        data:deletedReview
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  }
}