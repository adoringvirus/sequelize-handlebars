const { Router } = require('express');
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require('../../controller/user.controller');

const UserRouter = Router();
const USER_ROUTE_PREFIX = '/users';

UserRouter.get(`${USER_ROUTE_PREFIX}`,getAllUsers);
UserRouter.get(`${USER_ROUTE_PREFIX}/:id`,getOneUser);
UserRouter.post(`${USER_ROUTE_PREFIX}`,createUser);
UserRouter.put(`${USER_ROUTE_PREFIX}/:id`,updateUser);
UserRouter.delete(`${USER_ROUTE_PREFIX}/:id`,deleteUser);

module.exports = UserRouter;