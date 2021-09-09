const { Router } = require('express');
const { getAllCategoriesFromMovie, assignCategoryToMovie, unsignedCategoryFromMovie } = require('../../controller/category.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const CategoryModel = require('../../models/category/category.model');
const MovieModel = require('../../models/movie/movie.model');
const { baseRoute } = require('./base.routes');


const CategoryRouter = Router();
CategoryRouter.get('/movies/categories',async (req,res)=>{

  try {
    const categories = await CategoryModel.findAll({
      include: MovieModel
    });

    res.status(200).json({categories})
  } catch (error) {
    res.status(400).json({error})
  }
})

CategoryRouter.post('/movies/:movieId/categories/:categoryId',isParamValid,assignCategoryToMovie);
CategoryRouter.delete('/movies/:movieId/categories/:categoryId',isParamValid,unsignedCategoryFromMovie);

baseRoute(CategoryRouter,CategoryModel,'categories')

module.exports = CategoryRouter;