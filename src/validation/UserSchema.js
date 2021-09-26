const Yup = require('yup');

const UserSchema = (_update=false)=>{
  if(_update){
    return Yup.object({
      user_username: Yup.string(),
      user_first_name: Yup.string().min(0).max(5),
      user_last_name: Yup.string("value must be a number"),
      user_phone: Yup.string(),
      user_email:Yup.string().email(), 
      user_password: Yup.string(),
      user_avatar: Yup.string().url()
    })
  }else{
    return Yup.object({
      user_username: Yup.string().required(),
      user_first_name: Yup.string().min(5).required(),
      user_last_name: Yup.string("value must be a number").required(),
      user_phone: Yup.string(),
      user_email:Yup.string().email().required(), 
      user_password: Yup.string().required(),
      user_avatar: Yup.string().url()
    })
  }
}

module.exports = UserSchema