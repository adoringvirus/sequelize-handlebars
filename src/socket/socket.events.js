
const { createOneTask,findAllTask, deleteOneTask, updateOneTask } = require('./task.service')

module.exports = {
  async newTask(client,_data){
    await createOneTask(_data);
    const tasks = await findAllTask();

    client.emit("get:task",tasks)
  },
  async destroyTask(client,_data){
    const { id } = _data;
    await deleteOneTask(id);
    const tasks = await findAllTask();
  
    client.emit("get:task",tasks)
  },
  async updateTask(client,_data){
    await updateOneTask(_data.id,_data)
    const tasks = await findAllTask();
    
    client.emit("get:task",tasks)
  }
}