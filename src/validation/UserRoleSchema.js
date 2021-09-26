const Yup = require('yup');

const UserRoleSchema = (_update=false)=>{ 
  yupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    user_role_name: yupObject,
    user_role_description: Yup.string()
  })
}

module.exports = UserRoleSchema