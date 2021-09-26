const { Router } = require('express');
const { isValidBody, isParamValid } = require('../../middlewares/validation.middleware');
const MovieSchema = require('../../validation/MovieSchema');
const { assignFilmakingMemberToMovie, unsignedFilmakingMemberFromMovie } = require('../../controller/filmaking-member.controller');
const { getAllMovies, createMovie, updateMovie, getOneMovie, deleteMovie } = require('../../controller/movie.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');


const MoviesRouter = Router();
const MOVIE_ROUTE_PREFIX = '/movies'
const isUpdate = true

MoviesRouter.get(`${MOVIE_ROUTE_PREFIX}`,getAllMovies);
MoviesRouter.get(`${MOVIE_ROUTE_PREFIX}/:id`,isParamValid,getOneMovie);
MoviesRouter.post(`${MOVIE_ROUTE_PREFIX}`,isValidBody(MovieSchema()),isSuperAdmin,createMovie);
MoviesRouter.put(`${MOVIE_ROUTE_PREFIX}/:id`,isValidBody(MovieSchema(isUpdate)),isParamValid,isSuperAdmin, updateMovie);
MoviesRouter.delete(`${MOVIE_ROUTE_PREFIX}/:id`,isParamValid,isSuperAdmin,deleteMovie);

MoviesRouter.post(
  `${MOVIE_ROUTE_PREFIX}/:movieId/filmaking-members/:filmakingMemberId`,
  isSuperAdmin,
  assignFilmakingMemberToMovie
);
MoviesRouter.delete(
  `${MOVIE_ROUTE_PREFIX}/:movieId/filmaking-members/:filmakingMemberId`,
  isSuperAdmin,
  unsignedFilmakingMemberFromMovie
);

module.exports = MoviesRouter;