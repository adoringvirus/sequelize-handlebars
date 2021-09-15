const FilmakingMembersMoviesRelationModel = require("../models/relations/filmaking-member-movies.model");
const FilmakingMembersMemberRolesModel = require("../models/relations/filmaking-members-roles.model");

module.exports = {
  async addRoleToFilmakingMember(filmakingMemberId,filmakingMemberRoleId){
    try {
      return await FilmakingMembersMemberRolesModel.create({
        filmaking_member_id: filmakingMemberId,
        filmaking_member_role_id: filmakingMemberRoleId
      });
  
    } catch (error) {
      console.log(`error`, error)
      return null
    }

  },
  async deleteRoleFromFilmakingMember(filmakingMemberId,filmakingMemberRoleId){
    try {
      const deletedMemberRoleAssignment  = await FilmakingMembersMemberRolesModel.destroy({
        where:{
          filmaking_member_id: filmakingMemberId,
          filmaking_member_role_id: filmakingMemberRoleId
        }
      });
    
      if(!deletedMemberRoleAssignment) return undefined
      return deletedMemberRoleAssignment
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async addFilmakingMemberToMovie(filmakingMemberId,movieId){
    try {
      return await FilmakingMembersMoviesRelationModel.create({
        filmaking_member_id: filmakingMemberId,
        movie_id: movieId
      });

    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async deleteFilmakingMemberFromMovie(filmakingMemberId,movieId){
    try {
      const deletedAssignment  = await FilmakingMembersMoviesRelationModel.destroy({
        where:{
          filmaking_member_id: filmakingMemberId,
          movie_id: movieId
        }
      });
  
      if(!deletedAssignment) return undefined

      return deletedAssignment
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}