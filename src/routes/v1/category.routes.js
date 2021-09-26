const { Router } = require('express');
const { assignCategoryToMovie, unsignedCategoryFromMovie } = require('../../controller/category.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid, isValidBody } = require('../../middlewares/validation.middleware');
const CategoryModel = require('../../models/category/category.model');
const CategorySchema = require('../../validation/CategorySchema');
const { baseRoute } = require('./base.routes');

const CategoryRouter = Router();
const isUpdate = true;

baseRoute(CategoryRouter,CategoryModel,'categories',{
  postOptions: { postMiddlewares: [isValidBody(CategorySchema())] },
  putOptions: { putMiddlewares: [isValidBody(CategorySchema(isUpdate))] }
})

CategoryRouter.post('/movies/:movieId/categories/:categoryId',isSuperAdmin,isParamValid,assignCategoryToMovie);
CategoryRouter.delete('/movies/:movieId/categories/:categoryId',isSuperAdmin,isParamValid,unsignedCategoryFromMovie);


module.exports = CategoryRouter;