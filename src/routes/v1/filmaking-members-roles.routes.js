const { Router } = require('express');
const { isValidBody } = require('../../middlewares/validation.middleware');
const FilmakingMembersRolesModel = require('../../models/filmaking-member-roles/filmaking-members-roles.model');
const { baseRoute } = require('./base.routes');
const FilmakingMembersRolesSchema = require('../../validation/FilmakingMemberRoleSchema');

const FilmakingMembersRolesRouter = Router();
const isUpdate = true;

baseRoute(
  FilmakingMembersRolesRouter,
  FilmakingMembersRolesModel,
  'filmaking-members-roles',
  {
    postOptions: { 
      postMiddlewares: [isValidBody(FilmakingMembersRolesSchema())] 
    },
    putOptions: { 
      putMiddlewares: [isValidBody(FilmakingMembersRolesSchema(isUpdate))] 
    }
  }
)

module.exports = FilmakingMembersRolesRouter;