
exports.baseController  = (_model,_modelName)=> {

  return {
    async getAllModels (req,res){
      try {
        const models = await _model.findAll()
        res.json({
          data:models
        })
      } catch (error) {
        console.log(`error`, error)
        return res.status(500).json({
          error
        })
      }
    },
    async getOneModel (req,res){
      const { id } = req.params;
      try {
        const model = await _model.findOne({
          where:{
            id:id
          }
        })
        res.status(200).json({
          message:'',
          data:model
        })
      } catch (error) {
        res.status(400).json({
          message:`Could not find ${_modelName}`,
          error: error
        })
      }
    },
    async createModel (req,res){
      try {
        const newModel = await _model.create(req.body,{
          // fields:['']
        })
        res.json({
          message: `${_modelName} created`,
          data: newModel
        })
      } catch (error) {
        res.status(400).json(error)
      }
    },
  
    async updateModel (req,res){
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const { id } = req.params;
      const { } = req.body;
  
      const model = await _model.findOne({
        // attributes:[''],
        where:{
          id:id
        }
      })
  
      if(!model) res.status(400).json({
        message:`${_modelName} not found`
      })
  
      
      try {
        model.update(req.body);
        res.status(200).json({
          message:'',
          data:model
        })
      } catch (error) {
        res.status(400).json({
          message:'',
          error
        })
      }
    },
  
    async deleteModel(req,res){
      const { id } = req.params;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(ip);
  
      try {
        const model = await _model.destroy({
          where:{
            id:id
          }
        })
        res.status(200).json({
          message:`${_modelName} ${id} deleted`,
          data:model
        })
      } catch (error) {
        res.status(400).json({
          message:'',
          error:error
        })
      }
    }
  }

}