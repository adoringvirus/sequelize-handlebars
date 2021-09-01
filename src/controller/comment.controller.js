const CommentsModel = require("../models/comments.model");
const MovieModel = require("../models/movie/movie.model");
const { RESPONSES } = require('../responses/response')

module.exports  = {
  async getAllCommentsFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;

    try {
      const comments  = await CommentsModel.findAll({
        where:{
          movie_id: movieId
        },
      });
    
      if( comments.length === 0 ) res.status(400).json({
        message:'',
        status: '',
        error: 'movie does not exist'
      });
  
      res.status(200).json({
        message:'',
        data:comments
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },


  async getOneCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;

    try {
      const comments  = await CommentsModel.findOne({
        where:{
          id: commentId,
          movie_id: movieId
        }
      });
    
      if( !comments ) return res.status(400).json({
        message:'',
        status: '',
        error: 'comment does not exist'
      });
  
      res.status(200).json({
        message:'',
        data:comments
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async creteCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    // const { } = req.body
    try {
      const newComment  = await CommentsModel.create({
        ...req.body,
        movie_id: movieId,
        user_id: 2
      });
      
      res.status(200).json({
        message:'',
        data:newComment
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async updateCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;

    try {
      const comment  = await CommentsModel.findOne({
        where:{
          id: commentId,
          movie_id: movieId
        }
      });
    
      if( !comment ) return res.status(400).json({
        message:'',
        status: '',
        error: 'comment does not exist'
      });
  
      const updatedComment = await comment.update(req.body);

      res.status(200).json({
        message:'',
        data:updatedComment
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async deleteCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;

    try {
      const deletedComment  = await CommentsModel.destroy({
        where:{
          id: commentId,
          movie_id: movieId
        }
      });
    
      if( !deletedComment ) return res.status(400).json({
        message:'',
        status: '',
        error: 'comment does not exist'
      });
      
      res.status(200).json({
        message:`comment ${deletedComment} was deleted`,
        data:deletedComment
      })

    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  }
}