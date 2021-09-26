const Yup = require('yup');

const CommentSchema = (_update=false)=>{
  const commentYupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    comment_rating: Yup.string(),
    comment: commentYupObject
  })
}

module.exports = CommentSchema