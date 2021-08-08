const CategoryModel = require('../models/category.model')
const CommentsModel = require('../models/comments.model')
const FilmakingMembersModel = require('../models/filmaking-members.model')
const LikeModel = require('../models/like.model')
const MoviesModel = require('../models/movie.model')
const ReviewsModel = require('../models/reviews.model')
const UserModel = require('../models/user.model')

module.exports  = {
  async getAllMovies (req,res){
    try {
      const movies = await MoviesModel.findAll({
        include:[{
          model:CategoryModel,
          as:'categories'
        },{
          model:LikeModel
        },{
          model:CommentsModel
        },{
          model:FilmakingMembersModel
        },{
          model:ReviewsModel
        },]
      })
      res.json({
        data:movies
      })
    } catch (error) {
      console.log(`error`, error)
      return res.status(500).json({
        error
      })
    }
  },
  async getOneMovie (req,res){
    const { id } = req.params;
    try {
      const movie = await MoviesModel.findOne({
        where:{
          id:id
        }
      })
      res.status(200).json({
        message:'',
        data:movie
      })
    } catch (error) {
      res.status(400).json({
        message:'Could not find movie',
        error: error
      })
    }
  },
  async createMovie (req,res){
    const { } = req.body
    try {
      const newMovie = await MoviesModel.create(req.body,{
        fields:['']
      })
      res.json({
        message: 'Movie created',
        data: newMovie
      })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async updateMovie (req,res){
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { id } = req.params;
    const { } = req.body;

    const movie = await MoviesModel.findOne({
      // attributes:[''],
      where:{
        id:id
      }
    })

    if(!movie) res.status(400).json({
      message:'User not found'
    })

    
    try {
      movie.update(req.body)
      res.status(200).json({
        message:'',
        data:movie
      })
    } catch (error) {
      res.status(400).json({
        message:'',
        error
      })
    }
  },

  deleteMovie (req,res){
    const { id } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip);

    try {
      const movie = MoviesModel.destroy({
        where:{
          id:id
        }
      })
      res.status(200).json({
        message:`movie ${id} deleted`,
        movie:movie
      })
    } catch (error) {
      res.status(400).json({
        message:'',
        error:error
      })
    }
  }

}