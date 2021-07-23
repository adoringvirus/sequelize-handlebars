const { Router } = require('express');
const V1RootRouter = require('./v1/index');

const RootRouter = Router();
const API_V1 = '/v1'
RootRouter.use(`${API_V1}`,V1RootRouter);

module.exports = RootRouter