const { baseController } = require('../../controller/base.controller');
const { isSuperAdmin } = require('../../middlewares/auth.middleware');

const defaultOptions = {
  isGetProtected: true,
  isGetOneProtected: true,
  isPostProtected: true,
  isPutProtected: true,
  isDeleteProtected: true
}

exports.baseRoute = (router,model,modelName,routeOptions=defaultOptions)=>{
  

  // * Combination of incoming routes and default ones to make it 
  // * easier and optional when passing object
  const combinedRouteOptions = {
    ...defaultOptions,
    ...routeOptions
  }

  
  const { 
    getAllModels,getOneModel,
    createModel,updateModel,deleteModel
  } = baseController(model,modelName);
  
  // * get all models
  if( combinedRouteOptions.isGetProtected ){
    router.get(`/${modelName}`,isSuperAdmin,getAllModels);
  }else{
    router.get(`/${modelName}`,getAllModels);
  }

  // * get one model
  if( combinedRouteOptions.isGetOneProtected ){
    router.get(`/${modelName}/:id`,isSuperAdmin,getOneModel);
  }else{
    router.get(`/${modelName}/:id`,getOneModel);
  }

  // * create one model
  if( combinedRouteOptions.isPostProtected ){
    router.post(`/${modelName}`,isSuperAdmin,createModel);
  }else{
    router.post(`/${modelName}`, createModel);
  }

  // * update model
  if( combinedRouteOptions.isPutProtected ){
    router.put(`/${modelName}/:id`,isSuperAdmin, updateModel);
  }else{
    router.put(`/${modelName}/:id`, updateModel);
  }

  // * delete model
  if( combinedRouteOptions.isDeleteProtected ){
    router.delete(`/${modelName}/:id`,isSuperAdmin,deleteModel);
  }else{
    router.delete(`/${modelName}/:id`, deleteModel);
  }

  return router;
}