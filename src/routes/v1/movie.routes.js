const { Router } = require('express');
const { getAllMovies, createMovie, updateMovie, getOneMovie, deleteMovie } = require('../../controller/movie.controller');


const MoviesRouter = Router();
const MOVIE_ROUTE_PREFIX = '/movies'

MoviesRouter.get(`${MOVIE_ROUTE_PREFIX}`,getAllMovies);
MoviesRouter.get(`${MOVIE_ROUTE_PREFIX}/:id`,getOneMovie);
MoviesRouter.post(`${MOVIE_ROUTE_PREFIX}`,createMovie);
MoviesRouter.put(`${MOVIE_ROUTE_PREFIX}/:id`, updateMovie);
MoviesRouter.delete(`${MOVIE_ROUTE_PREFIX}/:id`,deleteMovie);

module.exports = MoviesRouter;