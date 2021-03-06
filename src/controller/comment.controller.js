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

    const { user_role:{user_role_name},id } = req.session.passport.user;

    const updatedComment = await updateOneCommentForMovie({
      commentId,
      movieId,
      userId: id,
      bypass: user_role_name === 'superadmin' ? true :  false
    },{
      ...req.body,
      updated_by: id
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

    if('isOwner' in updatedComment) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 403,
      message:'You are not the owner',
      data: null,
      error: true
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
    const { user_role:{user_role_name},id } = req.session.passport.user;

    const deletedComment = await deleteOneCommentForMovie({
      commentId,
      movieId,
      userId: id,
      bypass: user_role_name === 'superadmin' ? true :  false
    });

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

    if(!Number(deletedComment)){
      if('isOwner' in deletedComment) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 403,
        message:'You are not the owner',
        data: null,
        error: true
      }) 
    }

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Comment deleted',
      data: deletedComment
    })
  }
}