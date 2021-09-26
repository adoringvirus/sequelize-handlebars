const Yup = require('yup');

const MovieSchema = (_update=false)=>{
  if(_update){
    return Yup.object({
      movie_title: Yup.string(),
      movie_rating: Yup.number().min(0).max(5),
      like_count: Yup.number("value must be a number"),
      movie_description: Yup.string(),
      movie_release_date:Yup.string(), 
      movie_url: Yup.string().url(),
      movie_thumbnail: Yup.string()
    })
  }else{
    return Yup.object({
      movie_title: Yup.string().required(),
      movie_rating: Yup.number().min(0).max(5).required(),
      like_count: Yup.number("value must be a number"),
      movie_description: Yup.string().required(),
      movie_release_date:Yup.string().required(), 
      movie_url: Yup.string().required().url(),
      movie_thumbnail: Yup.string().required()
    })
  }
  
}
module.exports = MovieSchema;