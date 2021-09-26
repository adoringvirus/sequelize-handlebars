
const Yup = require('yup');

const UserStatusSchema = (_update=false)=>{
  yupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    user_status_name: yupObject,
    user_status_description: Yup.string()
  })
}

module.exports = UserStatusSchema