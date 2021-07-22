const Sequelize = require('sequelize');
const DBConfig = require('../config/database.config');

class sequelize {
  connection = {}

  constructor(){
    this.bootstrap();
  }

  bootstrap(){
    return this.connection = new Sequelize(
      DBConfig.POSTGRES_DB, 
      DBConfig.POSTGRES_USER, 
      DBConfig.POSTGRES_PASSWORD, {
        host: DBConfig.POSTGRES_HOST,
        dialect: 'postgres',
        
      },
    )
  }

  async initDatabase(){
    try {
      await this.connection.authenticate()
      console.log(`Database connected`)
    } catch (err) {
      console.log(`Database not connected`)
      console.log(err)
    }
  }
}

module.exports = new sequelize()