const { RESPONSES } = require("../responses/response");
const {  
  addRoleToFilmakingMember, 
  deleteRoleFromFilmakingMember, 
  addFilmakingMemberToMovie, 
  deleteFilmakingMemberFromMovie 
} = require("../services/filmaking-member-movie.service");

module.exports  = {
  async assignedFilmakingMemberToMemberRole(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,filmakingMemberRoleId } = req.params;
    const assignment  = await addRoleToFilmakingMember(filmakingMemberId,filmakingMemberRoleId);

    if(!assignment)  return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      error: true,
      message:'Error trying to assign role',
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: `Role assign to filmaking-member ${filmakingMemberId}`,
      data: assignment
    })
  },
  async unsignedFilmakingMemberFromMemberRole(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,filmakingMemberRoleId } = req.params;
    const deletedAssignment  = await deleteRoleFromFilmakingMember(filmakingMemberId,filmakingMemberRoleId);
    
    if(deletedAssignment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find filmaking member or role',
      error: true,
      data: null
    })

    if(deletedAssignment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred deleting role',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'Role deleted from filmaking member',
      data: deletedAssignment
    })

  },
  async assignFilmakingMemberToMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,movieId } = req.params;
    const assignment  = await addFilmakingMemberToMovie(filmakingMemberId,movieId);

    if(!assignment)  return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      error: true,
      message:'Error trying to assign filmaking member',
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 201,
      message: `Filmaking member assign to movie ${movieId}`,
      data: assignment
    })
  },
  async unsignedFilmakingMemberFromMovie(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { filmakingMemberId,movieId } = req.params;
    const deletedAssignment  = await deleteFilmakingMemberFromMovie(filmakingMemberId,movieId);
    
    if(deletedAssignment === undefined ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Could not find filmaking member or movie',
      error: true,
      data: null
    })

    if(deletedAssignment === null ) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'An error ocurred deleting filmaking member from movie',
      error: true,
      data: null
    })

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: `Filmaking member deleted from ${movieId}`,
      data: deletedAssignment
    })
  },
}