const redis = require('redis');
const redisClient = redis.createClient();

module.exports = (session) =>{
  const redisStore = require('connect-redis')(session);  

  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  return new redisStore({ 
    host: process.env.REDIS_HOST || 'localhost', 
    port: process.env.REDIS_PORT || 6379, 
    client: redisClient 
  });
}