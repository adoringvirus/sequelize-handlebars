const UsersModel = require('../models/user.model')

module.exports  = {
  async signIn(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    try {
      res.status(200).json({
        message:'',
        data: req.user
      })

    } catch (error) {

      res.status(400).json({
        message:'user not found',
        status: error
      })
    }
  },
  async signUp (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { 
      user_username,
      user_first_name,
      user_last_name,
      user_phone,
      user_email,
      user_password,
      user_avatar
    } = req.body;

    try {
      const user = await UsersModel.create({
        user_username,
        user_first_name,
        user_last_name,
        user_phone,
        user_email,
        user_password,
        user_avatar
      })
      
      user.user_password = undefined;

      res.status(201).json({
        message: 'User registered',
        data:user
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: error
      })
    }
  },
  async logout(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    req.logOut()
    res.status(200).json({
      message: 'user Log out successfully',
    })
  }
}