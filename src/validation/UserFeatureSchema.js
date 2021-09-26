const Yup = require('yup');

const UserFeatureSchema = (_update=false)=>{
  yupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    user_feature_name: yupObject,
    user_feature_description: Yup.string()
  })
}

module.exports = UserFeatureSchema