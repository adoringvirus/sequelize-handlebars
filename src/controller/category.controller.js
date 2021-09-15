const { addCategoryToMovie, deleteCategoryFromMovie } = require("../services/category-movie.service");
const { RESPONSES } = require('../responses/response');

module.exports  = {
  async assignCategoryToMovie  (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,categoryId } = req.params;

    const assignment  = await addCategoryToMovie(movieId,categoryId);

    if(!assignment)  return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      error: true,
      message:'Error trying to assign category',
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: `Category assign from movie ${movieId}`,
      data: assignment
    })

  },
  async unsignedCategoryFromMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId, categoryId } = req.params;

    const deletedAssignment  = await deleteCategoryFromMovie(movieId,categoryId);
    
    if(deletedAssignment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find movie or category',
      error: true,
      data: null
    })

    if(deletedAssignment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred assigning category',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: 'Category deleted',
      data: deletedAssignment
    })

  }
}