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

    if(!users){ return res.status(400).json({
      message:'An error occurred'
    })}

    if(users.length === 0) { return res.status(200).json({message:'No users yet'}) }

    return res.status(200).json({users:users})
  },
  async getOneUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const user = await findOneUser({ id:id })

    if(!user) { return res.status(400).json({
      message:'No user found'
    })}

    return res.status(200).json({
      message:'User found',
      data:user
    })
  },
  async createUser (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const createdUser = await createOneUser(req.body)

    if(!createdUser) {return res.status(400).json({
      message: 'Could not create user'
    })}
    
    res.status(201).json({ message:'User created',data:createdUser})
  },
  async updateUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const user = await updateOneUser({id:id})
  
    if(!user) return res.status(400).json({
      message:'User not found'
    })
    
    const updatedUser = await user.update(req.body)
    return res.status(200).json({
      message: 'User updated',
      data: updatedUser
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

    if(!deletedUser){ return res.status(400).json({ message:`Could not find user`}) }
    
    return res.status(200).json({ message:`movie ${id} deleted`})
  }
}