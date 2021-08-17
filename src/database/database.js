const Sequelize = require('sequelize');
const DBConfig = require('../config/database.config');
const pg = require('pg')
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

  async pool(){
    module.exports.POOL = new pg.Pool({
      uri: "",
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      port: POSTGRES_PORT,
      // ssl: true
    });
  }
}

module.exports = new sequelize()