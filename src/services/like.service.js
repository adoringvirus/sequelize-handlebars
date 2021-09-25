const LikeModel = require("../models/like/like.model")


module.exports = {
  async likeMovie(movieId,userId){
    try {
      return await LikeModel.create({
        movie_id:movieId,
        user_id: userId
      })

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async dislikeMovie(movieId,userId){
    try {
      const disliked = await LikeModel.destroy({
        where:{
          movie_id:movieId,
          user_id: userId
        }
      })

      if(!disliked) return undefined
      return disliked
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}