const { addFeatureToUser, deleteFeatureFromUser } = require("../services/user-feature.service");
const { RESPONSES } = require('../responses/response');

module.exports  = {
  async assignFeatureToUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
    ){
      const { userFeatureId,userId } = req.params;
      
      const assignment  = await addFeatureToUser(userFeatureId,userId);

      if(!assignment)  return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        error: true,
        message:'Error trying to assign feature',
        data: null
      })
  
      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 201,
        message: `Category assign from user ${userId}`,
        data: assignment
      })
    },
    async unsignedFeatureFromUser(
      /** @type {import('express').Request } */
      req,
      /** @type {import('express').Response } */
      res
    ){
      const { userFeatureId,userId } = req.params;
      const deletedAssignment  = await deleteFeatureFromUser(userFeatureId,userId);
    
      if(deletedAssignment === undefined ) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        message: 'Could not find user or feature',
        error: true,
        data: null
      })
  
      if(deletedAssignment === null ) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        message: 'An error ocurred assigning feature',
        error: true,
        data: null
      })
  
      return RESPONSES.OK(res,{
        path: req.originalUrl,
        message: 'Feature deleted',
        data: deletedAssignment
      })
    },
  }