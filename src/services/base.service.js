
module.exports = {
  async findAllEntities(EntityModel,whereObject={}){
    try {
      const entities = await EntityModel.findAll({
        where: whereObject,
      });
      if(entities.length === 0) { return [] }
      return entities;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async findOneEntity(EntityModel,whereObject){
    try {
      const entity = await EntityModel.findOne({
        where: whereObject
      });
      return entity;
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async createOneEntity(EntityModel,entityInfo){
    
    try {
      const createdEntity = await EntityModel.create(entityInfo)

      return createdEntity
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async updateOneEntity(EntityModel,entityInfo,whereObject){
    try {
      const entity = await EntityModel.findOne({
        where: whereObject,
      });

      const createdEntity = await entity.update(entityInfo);

      return createdEntity
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteOneEntity(EntityModel,whereObject){
    try {
      const deletedEntity = await EntityModel.destroy({
        where: whereObject
      })
      return deletedEntity
    } catch (error) {
      console.log(`error`, error)
      return null;
    }
  }
}