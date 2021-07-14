const express = require('express');
const Sequelize = require('./database')
require('dotenv').config()

class App {
  app = express();
  PORT = process.env.PORT || 3004
  
  async init (){
    this.app.get('/',(req,res)=>{
      res.json({
        checking:'hello'
      })
    })

    
    try {
      this.app.listen(this.PORT)
      console.log(`Server running on port ${this.PORT}`)
    } catch (error) {
      console.log(error)
    }
    await Sequelize.initDatabase();
  }
}


module.exports = new App()