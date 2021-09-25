const { RESPONSES } = require("../responses/response");
const { likeMovie,dislikeMovie } = require("../services/like.service");

module.exports  = {
  async like(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const { id:userId } = req.session.passport.user;

    const _like  = await likeMovie(movieId,userId);

    if(!_like)  return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      error: true,
      message:'Error trying to like movie',
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: `Movie ${movieId} liked`,
      data: _like
    })
  },
  async dislike(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId } = req.params;
    const { id:userId } = req.session.passport.user;

    const _dislike  = await dislikeMovie(movieId,userId);
    
    if(_dislike === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie',
      error: true,
      data: null
    })

    if(_dislike === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred disliking movie',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: `Movie ${movieId} disliked`,
      data: _dislike
    })

  }
}