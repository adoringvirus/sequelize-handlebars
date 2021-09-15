const ReviewModel = require("../models/reviews/reviews.model");

module.exports = {
  async findAllReviewsFromMovie(movieId){

    try {
      const reviews  = await ReviewModel.findAll({
        where:{
          movie_id: movieId
        },
      });

      if ( reviews.length === 0 ) return [ ]
  
      return reviews;
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async findOneReviewFromMovie(reviewId,movieId){
    try {
      const review  = await ReviewModel.findOne({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !review ) return []
  
      return review

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async createOneReviewForMovie({movieId,userId},body){
  
    try {
      return await ReviewModel.create({
        review_description: body.review_description,
        movie_id: movieId,
        user_id: userId,
        created_by: userId
      });
      
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async updateOneReviewsForMovie({reviewId,movieId},body){
    try {
      const review  = await ReviewModel.findOne({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !review ) return undefined
  
      return await review.update({
        review_description:body.review_description,
        updated_by: body.updated_by
      });

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async deleteOneReviewFromMovie(reviewId,movieId){
    try {
      const deletedReview  = await ReviewModel.destroy({
        where:{
          id: reviewId,
          movie_id: movieId
        }
      });
    
      if( !deletedReview ) return undefined
      
      return deletedReview

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}