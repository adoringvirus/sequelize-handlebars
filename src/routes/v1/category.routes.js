const { Router } = require('express');
const CategoryModel = require('../../models/category.model');
const { baseRoute } = require('./base.routes');


const CategoryRouter = Router();
baseRoute(CategoryRouter,CategoryModel,'category','movies/categories')

module.exports = CategoryRouter;