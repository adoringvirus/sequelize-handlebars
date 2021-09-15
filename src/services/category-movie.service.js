const MovieCategoryRelationModel = require("../models/relations/movies-category.model");


module.exports = {
  async addCategoryToMovie(movieId,categoryId){
    try {
      const newCategoryAssignment  = await MovieCategoryRelationModel.create({
        movie_id: movieId,
        category_id: categoryId
      });
  
      return newCategoryAssignment

    } catch (error) {
      console.log(`error`, error.parent.detail)
      return null
    }
  },
  async deleteCategoryFromMovie(movieId,categoryId){
    try {
      const deletedAssignment  = await MovieCategoryRelationModel.destroy({
        where:{
          movie_id: movieId,
          category_id: categoryId
        }
      });
    
      if( !deletedAssignment ) return undefined

      return deletedAssignment
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}