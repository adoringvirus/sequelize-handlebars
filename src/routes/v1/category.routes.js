const { Router } = require('express');
const { assignCategoryToMovie, unsignedCategoryFromMovie } = require('../../controller/category.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid } = require('../../middlewares/validation.middleware');
const CategoryModel = require('../../models/category/category.model');
const { baseRoute } = require('./base.routes');


const CategoryRouter = Router();
baseRoute(CategoryRouter,CategoryModel,'categories')
CategoryRouter.post('/movies/:movieId/categories/:categoryId',isSuperAdmin,isParamValid,assignCategoryToMovie);
CategoryRouter.delete('/movies/:movieId/categories/:categoryId',isSuperAdmin,isParamValid,unsignedCategoryFromMovie);


module.exports = CategoryRouter;