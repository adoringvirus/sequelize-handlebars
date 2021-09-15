const TaskModel = require("../models/task.model");

module.exports = {
  async findAllTask(){
    try {
      const tasks = await TaskModel.findAll({
        where:{
          is_task_active: true
        }
      });
      return tasks
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  // task_title,
  // task_name,
  // task_due_date,
  // markdown_description,
  // task_labels,
  // starred,
  // task_board, 
  // user_name
  async findOneTask(){
    try {
      const foundTask = await TaskModel.findOne({
        where:{
          id:id,
          is_task_active: true
        }
      })

      if(!foundTask) return []

      return foundTask
    } catch (error) {
      console.log('error: ',error)
      return null
    }
  },
  async createOneTask(data){
    data.task_labels = data.task_labels.toString();
    
    try {
      const task = await TaskModel.create({...data,is_task_active: true})
      return task
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  },
  async updateOneTask(id,_data){
    try {
      const foundTask = await TaskModel.findOne({
        where:{
          id:id,
          is_task_active: true
        }
      })

      if(!foundTask) return [];

      await foundTask.update({..._data})

      return foundTask
    } catch (error) {
      console.log('error: ',error)
      return null
    }
  },
  async deleteOneTask(id){
    try {
      const foundTask = await TaskModel.findOne({
        where:{
          id:id,
          is_task_active: true
        }
      })

      if(!foundTask) return []
      foundTask.is_task_active = false;
    
      await foundTask.save()
      return foundTask 
    } catch (error) {
      console.log(`error`, error)
      return null
    }
  }
}