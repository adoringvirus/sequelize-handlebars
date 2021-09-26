const Yup = require('yup');

const ReviewSchema = (_update=false)=>{
  yupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    review_description: yupObject
  })
}

module.exports = ReviewSchema