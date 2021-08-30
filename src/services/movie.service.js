const ReviewsModel = require('../models/reviews.model');
const CommentsModel = require('../models/comments.model');
const LikeModel = require('../models/like.model');
const FilmakingMembersModel = require('../models/filmaking-members.model');
const MovieModel = require('../models/movie.model');
const CategoryModel = require('../models/category.model');

module.exports = {
  async findAllMovies(whereObject={}){
    try {
      const movies = await MovieModel.findAll({
        where: whereObject,
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
        }]
      });
      if(movies.length === 0) { return [] }
      return movies;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async findOneMovie(whereObject){
    try {
      const movie = await MovieModel.findOne({
        where: whereObject,
        include: [
          ReviewsModel,
          CommentsModel,
          LikeModel,
          FilmakingMembersModel
        ]
      });
      if(!movie){return []}
      return movie;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async createOneMovie(movieInfo){

    const { 
      movie_title,
      movie_rating ,
      movie_description,
      movie_release_date,
      movie_url,
      movie_thumbnail,
      created_by 
    } = movieInfo;
    
    try {
      
      const movie = await MovieModel.create({
        movie_title,
        movie_rating ,
        movie_description,
        movie_release_date,
        movie_url,
        movie_thumbnail,
        created_by
      })

      return movie
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async updateOneMovie(movieInfo,whereObject){
    try {
      const movie = await MovieModel.findOne({
        where: whereObject,
      });
      if(!movie){return []}
      await movie.update(movieInfo);

      return movie
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteOneMovie(whereObject){
    try {
      const movie = await MovieModel.destroy({
        where: whereObject
      })
      return movie
    } catch (error) {
      console.log(`error`, error)
      return null;
    }
  }
}