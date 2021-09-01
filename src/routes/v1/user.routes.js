const { Router } = require('express');
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require('../../controller/user.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid } = require('../../middlewares/validation.middleware');

const UserRouter = Router();
const USER_ROUTE_PREFIX = '/users';

UserRouter.get(`${USER_ROUTE_PREFIX}`,isSuperAdmin,getAllUsers);
UserRouter.get(`${USER_ROUTE_PREFIX}/:id`,isParamValid,isSuperAdmin,getOneUser);
UserRouter.post(`${USER_ROUTE_PREFIX}`,isParamValid,isSuperAdmin,createUser);
UserRouter.put(`${USER_ROUTE_PREFIX}/:id`,isParamValid,isSuperAdmin,updateUser);
UserRouter.delete(`${USER_ROUTE_PREFIX}/:id`,isParamValid,isSuperAdmin,deleteUser);

module.exports = UserRouter;