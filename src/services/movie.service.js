const ReviewsModel = require('../models/reviews/reviews.model');
const CommentsModel = require('../models/comments/comments.model');
const LikeModel = require('../models/like/like.model');
const FilmakingMembersModel = require('../models/filmaking-members/filmaking-members.model');
const MovieModel = require('../models/movie/movie.model');
const CategoryModel = require('../models/category/category.model');

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

    try {
      const movie = await MovieModel.create({
        movie_title: movieInfo.movie_title,
        movie_rating: movieInfo.movie_rating ,
        movie_description: movieInfo.movie_description,
        movie_release_date: movieInfo.movie_release_date,
        movie_url: movieInfo.movie_url,
        movie_thumbnail: movieInfo.movie_thumbnail,
        created_by: movieInfo.created_by
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

      if(!movie){ return [] }

      await movie.update({
        movie_title: movieInfo.movie_title,
        movie_rating: movieInfo.movie_rating ,
        movie_description: movieInfo.movie_description,
        movie_release_date: movieInfo.movie_release_date,
        movie_url: movieInfo.movie_url,
        movie_thumbnail: movieInfo.movie_thumbnail,
        updated_by: movieInfo.updated_by
      });

      return movie
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteOneMovie(whereObject){
    try {
      const movie = await MovieModel.destroy({ where: whereObject })
      if(!movie){ return [] }

      return movie
    } catch (error) {
      console.log(`error`, error)
      return null;
    }
  }
}