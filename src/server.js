const express = require('express');
const Sequelize = require('./database')
const morgan = require('morgan')
const path = require('path');
const RootRouter = require('./routes');

require('dotenv').config()

class App {
  app = express();
  PORT = process.env.PORT || 3004
  API_PREFIX = '/api'

  constructor(){
    this.middleware();

    try {
      this.app.listen(this.PORT)
      console.log(`Server running on port ${this.PORT}`)
    } catch (error) {
      console.log(error)
    }
  }

  middleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.static(path.join(__dirname,'public')));
    this.app.use(morgan('dev'));
  }

  async init (){
    await Sequelize.initDatabase();
    this.app.use(`${this.API_PREFIX}`,RootRouter)
  }
}


module.exports = new App()