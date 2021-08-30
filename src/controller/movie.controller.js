const MoviesModel = require('../models/movie.model');
const { RESPONSES } = require('../responses/response');
const { findOneMovie, findAllMovies, createOneMovie, updateOneMovie, deleteOneMovie } = require('../services/movie.service');

module.exports  = {
  async getAllMovies (req,res){
    // console.log(`req.user.id`, req.session.passport.user)
    const movies = await findAllMovies()
    if(!movies) { return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 500,
      message: 'Error trying to find movie',
      data: null,
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'Movies Found',
      data: movies,
    })
  },
  async getOneMovie (req,res){
    const { id } = req.params;
    const movie = await findOneMovie({id:id});

    if(Array.isArray(movie)){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Movie does not exist exist',
      data: null,
    })}
    
    if(!movie){ return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 500,
      message: 'An error ocurred trying to update the movie',
      data: null,
    })}
    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: `Movie ${ id } found`,
      data: movie,
    })
  },
  async createMovie (req,res){
    const newMovie = await createOneMovie({
      ...req.body,
      created_by: req.user.id
    });

    
    if(!newMovie){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Could not create movie',
      data: null,
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: 'Movie created',
      data: newMovie
    })
  },

  async updateMovie (req,res){
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { id } = req.params;
    const { } = req.body;

    const updatedMovie = await updateOneMovie({
      ...req.body,
      updated_by:req.user.id
    },{id:id});

    if(Array.isArray(updatedMovie)){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Movie does not exist',
      data: null,
    })}

    if(!updatedMovie) {return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Could not update movie',
      data: null,
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'Movie updated',
      data: updatedMovie
    })
  },

  async deleteMovie (req,res){
    const { id } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip);

    const deletedMovie = await  deleteOneMovie({id:id})
    
    if(!deletedMovie){ return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 400,
      message: 'Could not update movie',
      data: null,
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'Movie deleted',
      data: deletedMovie,
    })
  }
}