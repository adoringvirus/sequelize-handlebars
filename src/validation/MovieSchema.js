const Yup = require('yup');

const MovieSchema = Yup.object({
  movie_title: Yup.string().required(),
  movie_rating: Yup.number().min(0).max(5).required(),
  like_count: Yup.number("value must be a number"),
  movie_description: Yup.string().required(),
  movie_release_date:Yup.string().required(), 
  movie_url: Yup.string().required().url(),
  movie_thumbnail: Yup.string().required()
})

module.exports = MovieSchema;