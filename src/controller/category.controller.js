const CategoryModel = require("../models/category.model");
const MovieModel = require("../models/movie.model");
const MovieCategoryRelationModel = require("../models/relations/movies-category.model");

module.exports  = {
  async unsignedCategoryFromMovie (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId,categoryId } = req.params;

    try {
      const deletedAssignment  = await MovieCategoryRelationModel.destroy({
        where:{
          movie_id: movieId,
          category_id: categoryId
        }
      });
    
      if( deletedAssignment.length === 0 ) res.status(400).json({
        message:'',
        status: '',
        error: 'movie does not exist'
      });
  
      return res.status(200).json({
        message:'',
        data:deletedAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async assignCategoryToMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { movieId, categoryId } = req.params;

    try {
      const newCategoryAssignment  = await MovieCategoryRelationModel.create({
        movie_id: movieId,
        category_id: categoryId
      });
  
      return res.status(200).json({
        message:'',
        data:newCategoryAssignment
      })
    } catch (error) {
      // console.log(`error`, error.parent.detail)
      res.status(400).json({
        message:'',
        status:'failed',
        error:error.parent.detail
      })
    }
  }
}