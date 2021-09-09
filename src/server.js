const express = require('express');
const Sequelize = require('./database/database')
const morgan = require('morgan')
const path = require('path');
const passport = require('passport');
var cookieParser = require('cookie-parser')
const session = require('express-session');
const RootRouter = require('./routes');
const flash = require('connect-flash');
const AuthRouter = require('./routes/v1/auth.routes');
const pgSession = require('connect-pg-simple')(session);
const databaseConfig = require('./config/database.config');
const rdbStore = require('./redis/redis.store')(session);
require('./authentication/passport')(passport)
require('dotenv').config()
const cors = require('cors');
// const postgresStore = new pgSession({
//   // pool:databaseConfig.pool,
//   conString: databaseConfig.PG_CONNECT_STRING,
//   tableName: 'session'
// })


class App {
  app = express();
  PORT = process.env.PORT || 3004

  constructor (){

  }

  middleware(){
    const oneDay = 1000 * 60 * 60 * 24;
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.static(path.join(__dirname,'public')));
    this.app.use(morgan('dev'));
    this.app.use(cors("*"))
    this.app.use(flash());
    this.app.use(cookieParser())
    this.app.use(session({
      name: '_redis_postgres_db',
      secret: process.env.SECRET || 'ad@$%6Gqw+df/asd',
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false, maxAge: oneDay },
      store: rdbStore,
    }))
    
    // * Initializing passport instance to add it to the req object
    // * and telling express to handle sessions with passport
    this.app.use(passport.initialize());
    this.app.use(passport.session())
    
  }

  async initRoutes (){
    await Sequelize.initDatabase();
    this.app.use(AuthRouter)
    this.app.use(`/api`,RootRouter)

    // * 404 error
    this.app.use(function(req,res){
      res.status(404).json({error:'nop baby'});
    });

    // * 500 error
    this.app.use(function(error, req, res, next) {
      console.log(`error`, error)
      res.status(500).send('500: Internal Server Error');
    });
  }

  async init(){
    this.initRoutes();
    this.middleware();

    try {
      this.app.listen(this.PORT)
      console.log(`Server running on port ${this.PORT}`)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new App()