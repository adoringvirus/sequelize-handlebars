const { Router } = require('express');
const CommentsModel = require('../../models/comments.model');
const { baseRoute } = require('./base.routes');
const MoviesModel = require('../../models/movie.model');
const UserModel = require('../../models/user.model');

const CommentsRouter = Router();
CommentsRouter.get('/movies/:movieId/comments',async (req,res)=>{
  const { movieId } = req.params;
  
  try {
    const movie  = await CommentsModel.findAll({
      include: [ UserModel, MoviesModel ],
    })
    res.status(200).json({
      message:'',
      data:movie
    })
  } catch (error) {
    console.log(`error`, error)
    res.status(400).json({
      error:error
    })
  }
})
baseRoute(CommentsRouter,CommentsModel,'comments','movies/comments')

module.exports = CommentsRouter;