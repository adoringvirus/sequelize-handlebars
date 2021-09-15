const { Router } = require('express');
const { assignCategoryToMovie, unsignedCategoryFromMovie } = require('../../controller/category.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');
const CategoryModel = require('../../models/category/category.model');
const { baseRoute } = require('./base.routes');


const CategoryRouter = Router();
baseRoute(CategoryRouter,CategoryModel,'categories')
CategoryRouter.post('/movies/:movieId/categories/:categoryId',isParamValid,assignCategoryToMovie);
CategoryRouter.delete('/movies/:movieId/categories/:categoryId',isParamValid,unsignedCategoryFromMovie);


module.exports = CategoryRouter;