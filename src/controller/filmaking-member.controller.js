const FilmakingMembersMoviesRelationModel = require("../models/relations/filmaking-member-movies.model");
const FilmakingMembersMemberRolesModel = require("../models/relations/filmaking-members-roles.model");

module.exports  = {
  async unsignedFilmakingMemberFromMemberRole(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,filmakingMemberRoleId } = req.params;
    
    try {
      const deletedMemberRoleAssignment  = await FilmakingMembersMemberRolesModel.destroy({
        where:{
          filmaking_member_id: filmakingMemberId,
          filmaking_member_role_id: filmakingMemberRoleId
        }
      });
    
      if( deletedMemberRoleAssignment.length === 0 ) res.status(400).json({
        message:'',
        status: '',
        error: 'user does not exist'
      });
  
      return res.status(200).json({
        message:'',
        data:deletedMemberRoleAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        error:error
      })
    }
  },
  async assignedFilmakingMemberToMemberRole(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,filmakingMemberRoleId } = req.params;
    // console.log(`filma`, filmakingMemberId)
    try {
      const newMemberRoleAssignment  = await FilmakingMembersMemberRolesModel.create({
        filmaking_member_id: filmakingMemberId,
        filmaking_member_role_id: filmakingMemberRoleId
      });
  
      return res.status(200).json({
        message:'',
        data: newMemberRoleAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        message:'',
        status:'failed',
        error:error.parent.detail
      })
    }
  },
  async assignFilmakingMemberToMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,movieId } = req.params;
    try {
      const newMovieAssignment  = await FilmakingMembersMoviesRelationModel.create({
        filmaking_member_id: filmakingMemberId,
        movie_id: movieId
      });
  
      return res.status(200).json({
        message:'',
        data: newMovieAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        message:'',
        status:'failed',
        error:error.parent.detail
      })
    }
  },
  async unsignedFilmakingMemberFromMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,movieId } = req.params;
    try {
      const newMovieAssignment  = await FilmakingMembersMoviesRelationModel.destroy({
        filmaking_member_id: filmakingMemberId,
        movie_id: movieId
      });
  
      return res.status(200).json({
        message:'',
        data: newMovieAssignment
      })
    } catch (error) {
      console.log(`error`, error)
      res.status(400).json({
        message:'',
        status:'failed',
        error:error.parent.detail
      })
    }
  },
}