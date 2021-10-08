const { user_id } = require("../models/like/like.definition");

module.exports = {
  async findAllEntities(EntityModel,whereObject={}){
    try {
      const entities = await EntityModel.findAll();
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

      if(!entity) return []

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
  async createManyEntities(EntityModel,entityInfoArray){
    
    try {
      const createdEntity = await EntityModel.bulkCreate(entityInfoArray)

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

      if(!entity) return []

      const updatedEntity = await entity.update(entityInfo);

      return updatedEntity
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteOneEntity(EntityModel,whereObject,userId){
    try {
      const entity = await EntityModel.findOne({
        where: whereObject
      });

      if(!entity) return []
      await entity.update({
        deleted_by: userId,
      })

      const deletedEntity = await entity.destroy();

      return deletedEntity
    } catch (error) {
      console.log(`error`, error)
      return null;
    }
  }
}