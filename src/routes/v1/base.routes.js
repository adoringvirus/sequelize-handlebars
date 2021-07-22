const { baseController } = require('../../controller/base.controller');

exports.baseRoute = (router,model,modelName)=>{
  const { 
    getAllModels,getOneModel,
    createModel,updateModel,deleteModel
  } = baseController(model,modelName);
  
  router.get(`/${modelName}`,getAllModels);
  router.get(`/${modelName}/:id`,getOneModel);
  router.post(`/${modelName}`,createModel);
  router.put(`/${modelName}/:id`, updateModel);
  router.delete(`/${modelName}/:id`,deleteModel);

  return router;
}