const { Router } = require('express');
const { 
  assignedFilmakingMemberToMemberRole,
  unsignedFilmakingMemberFromMemberRole 
} = require('../../controller/filmaking-member.controller');
const { isParamValid } = require('../../middlewares/validation.middleware');

const FilmakingMembersModel = require('../../models/filmaking-members/filmaking-members.model');
const { baseRoute } = require('./base.routes');


const FilmakingMembersRouter = Router();
const BASE_ROUTE = `/filmaking-members/:filmakingMemberId/filmaking-members-roles/:filmakingMemberRoleId`

baseRoute(
  FilmakingMembersRouter,
  FilmakingMembersModel,
  'filmaking-members'
)
FilmakingMembersRouter.post(`${BASE_ROUTE}`,isParamValid,assignedFilmakingMemberToMemberRole)
FilmakingMembersRouter.delete(`${BASE_ROUTE}`,isParamValid,unsignedFilmakingMemberFromMemberRole)


// FilmakingMembersRouter.stack.map(Layers=>{
//   console.log('      ')
//   console.log('******-----------********')
//   console.log(Layers.route.path)
//   console.log(Layers.route.stack[0].method)
//   console.log('******-----------********')
//   console.log('      ')
// })
module.exports = FilmakingMembersRouter;