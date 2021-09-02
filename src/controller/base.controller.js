const { RESPONSES } = require("../responses/response");
const { findAllEntities, findOneEntity, createOneEntity, updateOneEntity, deleteOneEntity } = require("../services/base.service")

exports.baseController  = (_model,_modelName)=> {

  return {
    async getAllModels (req,res){

      const allModels = await findAllEntities(_model);

      if(!allModels){ return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `An error ocurred trying to find ${_modelName} `,
        data: null,
      })}

      if(allModels.length === 0) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `No ${_modelName} yet`,
        data: [],
      })

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 200,
        message: `${_modelName} found`,
        data: allModels,
      })

    },
    async getOneModel (req,res){
      const { id } = req.params;
      const foundModel = await findOneEntity(_model,{id:id});

      if(!foundModel){ return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `An error ocurred trying to find ${_modelName} `,
        data: null,
      })}

      if(foundModel.length === 0) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `${_modelName} #${id} does not exist`,
      })

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 200,
        message: `${_modelName} #${id} found`,
        data: foundModel,
      })
    },
    async createModel (req,res){
      const createdModel = await createOneEntity(_model,req.body);

      if(!createdModel){ return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `An error ocurred trying to create ${_modelName} `,
        data: null,
      })}

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 201,
        message: `${_modelName} created`,
        data: createdModel,
      })
    },
  
    async updateModel (req,res){
      const { id } = req.params;
      const updatedModel = await updateOneEntity(_model, req.body, {id:id});

      if(!updatedModel){ return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `An error ocurred trying to update ${_modelName}`,
        data: null,
      })}

      if(updatedModel.length === 0) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `${_modelName} #${id} does not exist`,
      })

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 200,
        message: `${_modelName} #${id} found`,
        data: updatedModel,
      });
    },
  
    async deleteModel(req,res){
      const { id } = req.params;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(ip);
      const updatedModel = await deleteOneEntity(_model, req.body, {id:id});

      if(!updatedModel){ return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `An error ocurred trying to delete ${_modelName}`,
        data: null,
      })}

      if(updatedModel.length === 0) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 400,
        message: `${_modelName} #${id} does not exist`,
      })

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        code: 200,
        message: `${_modelName} #${id} deleted`,
        data: updatedModel,
      });
    }
  }

}