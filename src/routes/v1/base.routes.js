const { baseController } = require('../../controller/base.controller');

exports.baseRoute = (router,model,modelName,routeName)=>{
  const { 
    getAllModels,getOneModel,
    createModel,updateModel,deleteModel
  } = baseController(model,modelName);
  
  router.get(`/${routeName}`,getAllModels);
  router.get(`/${routeName}/:id`,getOneModel);
  router.post(`/${routeName}`,createModel);
  router.put(`/${routeName}/:id`, updateModel);
  router.delete(`/${routeName}/:id`,deleteModel);

  return router;
}