const CommentsModel = require('../models/comments.model')
const LikeModel = require('../models/like.model')
const MovieModel = require('../models/movie.model')
const UsersFeaturesRelationModel = require('../models/relations/user-features-users.model')
const ReviewsModel = require('../models/reviews.model')
const UserFeaturesModel = require('../models/user-features.model')
const UserRolesModel = require('../models/user-roles.model')
const UserStatusModel = require('../models/user-status.model')
const UsersModel = require('../models/user.model')


module.exports  = {
  async getAllUsers (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    try {
      const users = await UsersModel.findAll({
        include: [
          UserRolesModel,
          UserStatusModel,
          UserFeaturesModel,
          CommentsModel,
          LikeModel,
          ReviewsModel
        ],
      })
      res.status(200).json({users:users})
    } catch (error) {
      console.log(`error`, error)
      return res.status(500).json({
        error
      })
    }
  },
  async getOneUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;

    try {
      const user = UsersModel.findOne({
        where:{
          id:id
        }
      });

      res.status(200).json({
        message:'',
        data:user
      })
    } catch (error) {
      res.status(400).json({
        message:'',
        error
      })
    }
  },
  async createUser (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { 
      users_username,
      users_first_name,
      users_last_name,
      users_phone,
      users_email,
      users_password,
      users_avatar
    } = req.body;
    // console.log(`object`, req.body)
    // users_last_login_at
    // users_last_ip_address

    try {
      const user = await UsersModel.create({
        users_username,
        users_first_name,
        users_last_name,
        users_phone,
        users_email,
        users_password,
        users_avatar
      })

      res.status(201).json({
        user
      })
    } catch (error) {
      res.status(400).json({
        error: error
      })
    }
  },
  async updateUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const { } = req.body;

    const user = await UsersModel.findOne({
      // attributes:[''],
      where:{
        id:id
      }
    })

    if(!user) res.status(400).json({
      message:'User not found'
    })

    try {
      user.update(req.body)
      res.status(200).json({
        error: error
      })
    } catch (error) {
      res.status(400).json({
        error: error
      })
    }
  },
  deleteUser (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { id } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip);

    try {
      const user = UsersModel.destroy({
        where:{
          id:id
        }
      })
      res.status(200).json({
        message:`movie ${id} deleted`,
        movie:user
      })
    } catch (error) {
      res.status(400).json({
        message:'',
        error:error
      })
    }
  }
}