const CommentsModel = require("../models/comments/comments.model");

module.exports = {
  async findAllCommentsFromMovie(movieId){
    try {
      const comments  = await CommentsModel.findAll({
        where:{
          movie_id: movieId
        },
      });
      
      if ( comments.length === 0 ) return [ ]
  
      return comments;
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async findOneCommentFromMovie(commentId,movieId){
    try {
      const comment  = await CommentsModel.findOne({
        where:{
          id: commentId,
          movie_id: movieId
        }
      });
    
      if( !comment ) return [ ]
  
      return comment

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async createOneCommentForMovie({movieId,userId},body){
  
    try {
      return await CommentsModel.create({
        comment: body.comment,
        comment_rating: body.comment_rating,
        movie_id: movieId,
        user_id: userId,
        created_by: userId
      });
      
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async updateOneCommentForMovie({commentId,movieId,userId,bypass=false},body){
    try {
      const comment  = await CommentsModel.findOne({
        where:!bypass
        ?{
          id: commentId,
          movie_id: movieId,
          user_id: userId,
        }
        :{
          id: commentId,
          movie_id: movieId
        }
      });
    
      if( !bypass && !comment ) return {isOwner: false}
      if( !comment ) return undefined
  
      return await comment.update({
        comment:body.comment,
        comment_rating:body.comment_rating,
        updated_by: body.updated_by
      });

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async deleteOneCommentForMovie({commentId,movieId,userId,bypass=false}){
    try {
      const deletedComment  = await CommentsModel.destroy({
        where:!bypass
        ?{
          id: commentId,
          movie_id: movieId,
          user_id: userId
        }
        :{
          id: commentId,
          movie_id: movieId
        }
      });
      if( !bypass && !deletedComment ) return {isOwner: false}
      if( !deletedComment ) return undefined
      
      return deletedComment

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}