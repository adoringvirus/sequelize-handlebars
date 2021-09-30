const redis = require('redis');
const redisClient = redis.createClient();
const databaseConfig = require('../config/database.config');
module.exports = (session) =>{
  const redisStore = require('connect-redis')(session);  
  const pgSession = require('connect-pg-simple')(session);

  // const postgresStore = new pgSession({
  //   // pool:databaseConfig.pool,
  //   conString: databaseConfig.PG_CONNECT_STRING,
  //   tableName: 'session'
  // })
  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  return new redisStore({ 
    host: process.env.REDIS_HOST || 'localhost', 
    port: process.env.REDIS_PORT || 6379, 
    client: redisClient 
  });
}