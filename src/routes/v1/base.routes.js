const { baseController } = require('../../controller/base.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');
const { isParamValid } = require('../../middlewares/validation.middleware');
const { cloneDeep } = require('lodash');
const { isValidBody } = require('../../middlewares/validation.middleware');
const UserStatusSchema = require('../../validation/UserStatusSchema');

const defaultOptions = {
  getOptions:{
    isGetProtected: true,
    getMiddlewares: []
  },
  getOneOptions:{
    isGetOneProtected: true,
  },
  postOptions:{
    isPostProtected: true,
    postMiddlewares: []
  },
  putOptions:{
    isPutProtected: true,
    putMiddlewares: []
  },
  deleteOptions:{
    isDeleteProtected: true,
    deleteMiddlewares: []
  }
}

exports.baseRoute = (router,model,modelName,routeOptions=defaultOptions,)=>{
  

  // * Combination of incoming routes and default ones to make it 
  // * easier and optional when passing object
  const combinedRouteOptions = {
    ...cloneDeep(defaultOptions),
    ...cloneDeep(routeOptions)
  }

  const { 
    getAllModels,getOneModel,
    createModel,updateModel,deleteModel
  } = baseController(model,modelName);
  const { getOptions,getOneOptions,postOptions,putOptions,deleteOptions } = combinedRouteOptions
  // * get all models
  if( getOptions.isGetProtected ){
    router.get(`/${modelName}`,isSuperAdmin,getAllModels);
  }else{
    router.get(`/${modelName}`,getAllModels);
  }

  // * get one model
  if( getOneOptions.isGetOneProtected ){
    router.get(`/${modelName}/:id`,isParamValid,isSuperAdmin,getOneModel);
  }else{
    router.get(`/${modelName}/:id`,isParamValid,getOneModel);
  }

  // * create one model
  if( postOptions.isPostProtected ){
    router.post(`/${modelName}`,postOptions.postMiddlewares,isSuperAdmin,createModel);
  }else{
    router.post(`/${modelName}`,postOptions.postMiddlewares, createModel);
  }

  // * update model
  if( putOptions.isPutProtected ){
    router.put(`/${modelName}/:id`,putOptions.putMiddlewares,isParamValid,isSuperAdmin, updateModel);
  }else{
    router.put(`/${modelName}/:id`,putOptions.putMiddlewares,isParamValid, updateModel);
  }

  // * delete model
  if( deleteOptions.isDeleteProtected ){
    router.delete(`/${modelName}/:id`,isParamValid,isSuperAdmin,deleteModel);
  }else{
    router.delete(`/${modelName}/:id`,isParamValid, deleteModel);
  }

  return router;
}