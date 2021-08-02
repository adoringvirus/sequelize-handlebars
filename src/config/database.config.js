
module.exports = {
  POSTGRES_USER:process.env.POSTGRES_USER || 'postgres', 
  POSTGRES_DB:process.env.POSTGRES_DB || 'postgres',
  POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD || '123456789', 
  POSTGRES_HOST:process.env.POSTGRES_HOST || "localhost",
  dialect: 'postgres'
}