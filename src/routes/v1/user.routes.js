const { Router } = require('express');
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require('../../controller/user.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');

const UserRouter = Router();
const USER_ROUTE_PREFIX = '/users';

UserRouter.get(`${USER_ROUTE_PREFIX}`,isSuperAdmin,getAllUsers);
UserRouter.get(`${USER_ROUTE_PREFIX}/:id`,isSuperAdmin,getOneUser);
UserRouter.post(`${USER_ROUTE_PREFIX}`,isSuperAdmin,createUser);
UserRouter.put(`${USER_ROUTE_PREFIX}/:id`,isSuperAdmin,updateUser);
UserRouter.delete(`${USER_ROUTE_PREFIX}/:id`,isSuperAdmin,deleteUser);

module.exports = UserRouter;