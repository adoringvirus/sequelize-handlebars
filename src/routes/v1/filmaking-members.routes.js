const { Router } = require('express');
const { 
  assignedFilmakingMemberToMemberRole,
  unsignedFilmakingMemberFromMemberRole 
} = require('../../controller/filmaking-member.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid, isValidBody } = require('../../middlewares/validation.middleware');

const FilmakingMembersModel = require('../../models/filmaking-members/filmaking-members.model');
const { baseRoute } = require('./base.routes');
const FilmakingMembersSchema = require('../../validation/FilmakingMemberSchema');


const FilmakingMembersRouter = Router();
const BASE_ROUTE = `/filmaking-members/:filmakingMemberId/filmaking-members-roles/:filmakingMemberRoleId`
const isUpdate = true;

baseRoute(
  FilmakingMembersRouter,
  FilmakingMembersModel,
  'filmaking-members',
  {
    postOptions: { 
      postMiddlewares: [isValidBody(FilmakingMembersSchema())] 
    },
    putOptions: { 
      putMiddlewares: [isValidBody(FilmakingMembersSchema(isUpdate))] 
    }
  }
)

FilmakingMembersRouter.post(`${BASE_ROUTE}`,isParamValid,isSuperAdmin,assignedFilmakingMemberToMemberRole)
FilmakingMembersRouter.delete(`${BASE_ROUTE}`,isParamValid,isSuperAdmin,unsignedFilmakingMemberFromMemberRole)


// FilmakingMembersRouter.stack.map(Layers=>{
//   console.log('      ')
//   console.log('******-----------********')
//   console.log(Layers.route.path)
//   console.log(Layers.route.stack[0].method)
//   console.log('******-----------********')
//   console.log('      ')
// })
module.exports = FilmakingMembersRouter;