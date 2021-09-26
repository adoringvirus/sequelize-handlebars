const Yup = require('yup');

const FilmakingMemberRoleSchema = (_update=false)=>{
  yupObject = _update 
  ? Yup.string()
  : Yup.string().required()

  return Yup.object({
    filmaking_member_role_name: yupObject,
    filmaking_member_role_description: Yup.string(),
    filmaking_member_role_thumbnail: Yup.string().url()
  })
  
}
module.exports = FilmakingMemberRoleSchema