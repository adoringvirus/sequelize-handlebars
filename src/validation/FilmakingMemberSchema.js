const Yup = require('yup');

const FilmakingMemberSchema = (_update=false)=>{
  if(_update){
    return Yup.object({
      filmaking_member_first_name: Yup.string(),
      filmaking_member_last_name: Yup.string(),
      filmaking_member_birth_date: Yup.date(),
      filmaking_member_birth_place: Yup.string(),
      filmaking_member_thumbnail: Yup.string(),
      filmaking_member_bio: Yup.string(),
    })
  }else{
    return Yup.object({
      filmaking_member_first_name: Yup.string().required(),
      filmaking_member_last_name: Yup.string().required(),
      filmaking_member_birth_date: Yup.date().required(),
      filmaking_member_birth_place: Yup.string(),
      filmaking_member_thumbnail: Yup.string(),
      filmaking_member_bio: Yup.string(),
    })
  }
}

module.exports = FilmakingMemberSchema