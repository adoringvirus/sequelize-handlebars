const Yup = require('yup');

const stringMessage = 'Value must be string';
const requiredMessage = 'Value must be provided'
const MovieSchema = Yup.object({
  movie_title: Yup.string(stringMessage).required(requiredMessage),
  movie_rating: Yup.number(stringMessage).min(0).max(5).required(requiredMessage),
  like_count: Yup.number("value must be a number"),
  movie_description: Yup.string(stringMessage).required(requiredMessage),
  movie_release_date:Yup.string(stringMessage).required(requiredMessage), 
  movie_url: Yup.string(stringMessage).required(requiredMessage).url(),
  movie_thumbnail: Yup.string(stringMessage).required(requiredMessage)
})

module.exports = MovieSchema;