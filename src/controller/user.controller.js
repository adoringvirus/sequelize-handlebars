const { RESPONSES } = require('../responses/response');
const { 
  findAllUsers, findOneUser, 
  createOneUser, updateOneUser, 
  deleteOneUser 
} = require('../services/user.service')


module.exports  = {
  async getAllUsers (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const users = await findAllUsers();

    if(!users){ return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 500,
      data: null,
      message: 'Error trying to get all user',
    })}

    if(users.length === 0) { return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      data: [],
      message: 'No users yet',
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      data: users,
      message: 'Users found',
    })
  },
  async getOneUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const user = await findOneUser({ id:id })

    if(!user) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'No user found',
    })}

    user.user_password = undefined;

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      data: user,
      message: 'User found',
    })
  },
  async createUser (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const createdUser = await createOneUser({
      ...req.body,
      created_by:req.user.id
    })

    if(!createdUser) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'Could not create user',
    })
    
    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      data: createdUser,
      message: 'User created',
    })

  },
  async updateUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const updatedUser = await updateOneUser({
      ...req.body,
      updated_by:req.user.id
    },{id:id})
    
    if(!updatedUser) return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'Could not update user',
    })
    
    if(updatedUser.length === 0){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'No user found',
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'User updated',
      data: updateOneUser,
    })
  },
  async deleteUser (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip);

    const deletedUser = await deleteOneUser({id:id})

    if(!deletedUser){ return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'Could not delete user',
    })}
    
    if(deletedUser.length === 0){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code: 400,
      data: null,
      message: 'User does not exist',
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'User deleted',
      data: updateOneUser
    })
  }
}