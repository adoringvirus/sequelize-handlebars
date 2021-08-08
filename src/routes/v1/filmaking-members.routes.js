const { Router } = require('express');
const { assignedFilmakingMemberToMemberRole, unsignedFilmakingMemberFromMemberRole } = require('../../controller/filmaking-member.controller');
const FilmakingMembersModel = require('../../models/filmaking-members.model');
const FilmakingMembersMemberRolesModel = require('../../models/filmaking-members-roles.model');
const { baseRoute } = require('./base.routes');


const FilmakingMembersRouter = Router();
FilmakingMembersRouter.get('/filmaking-members',async (req,res)=>{
  try {
    const films = await FilmakingMembersModel.findAll({
      include: FilmakingMembersMemberRolesModel
    })

    res.status(200).json({
      films
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
})
FilmakingMembersRouter.post(
  '/movies/filmaking-members/:filmakingMemberId/filmaking-members-roles/:filmakingMemberRoleId',
  assignedFilmakingMemberToMemberRole
)
FilmakingMembersRouter.delete(
  '/movies/filmaking-members/:filmakingMemberId/filmaking-members-roles/:filmakingMemberRoleId',
  unsignedFilmakingMemberFromMemberRole
)
baseRoute(
  FilmakingMembersRouter,
  FilmakingMembersModel,
  'filmaking-members',
  'filmaking-members'
)

module.exports = FilmakingMembersRouter;