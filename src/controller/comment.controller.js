const { RESPONSES } = require('../responses/response');
const { findAllCommentsFromMovie, findOneCommentFromMovie, createOneCommentForMovie, updateOneCommentForMovie, deleteOneCommentForMovie } = require("../services/comment.service");

module.exports  = {
  async getAllCommentsFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const comments = await findAllCommentsFromMovie(movieId);

    if(comments.length === 0 ) return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'No comments yet',
      data: []
    })

    if(!comments) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred finding comments',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Category found',
      data: comments
    })
  },
  async getOneCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;
    const comment = await findOneCommentFromMovie(commentId,movieId);

    if(comment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or comment',
      error: true,
      data: null
    })

    if(comment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred finding comment',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Comment found',
      data: comment
    })
  },
  async creteCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const createdComment = await createOneCommentForMovie({
      movieId,
      userId: req.session.passport.user.id
    },req.body)

    if(!createdComment) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred creating the comment',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: 'Comment created',
      data: createdComment
    })
  },
  async updateCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;

    const updatedComment = await updateOneCommentForMovie({
      commentId,
      movieId
    },{
      ...req.body,
      updated_by: req.session.passport.user.id
    });

    if(updatedComment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or comment',
      error: true,
      data: null
    })

    if(updatedComment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred updating comment',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Comment updated',
      data: updatedComment
    })
  },
  async deleteCommentFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,commentId } = req.params;

    const deletedComment = await deleteOneCommentForMovie(commentId,movieId);

    if(deletedComment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or comment',
      error: true,
      data: null
    })

    if(deletedComment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred deleting comment',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Comment deleted',
      data: deletedComment
    })
  }
}