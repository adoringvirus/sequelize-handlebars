module.exports =  ()=>{
    // this.io.on('connection',async (client)=>{      
    //   console.log(`New connection`,client.id)
    //   try {
    //     const tasks = await TaskModel.findAll();
    //     client.emit('get:task',tasks)
    //   } catch (error) {
    //     console.log(`error`, error)
    //   }


    //   client.on('delete:task',async (data)=>{
    //     try {
    //       await TaskModel.destroy({
    //         where:{
    //           id:data.id
    //         }
    //       })
    //       const tasks = await TaskModel.findAll();
    //       client.emit("get:task",tasks)
    //     } catch (error) {
    //       console.log(`error`, error)
    //     }
    //   })

    //   client.on('new:task',async (data)=>{
    //     console.log('recieved',data)
    //     try {
    //       await TaskModel.create(data)
    //       const tasks = await TaskModel.findAll();
    //       client.emit("get:task",tasks)
    //     } catch (error) {
    //       console.log(`error`, error)
    //     }
    //   })
      
    // })
}