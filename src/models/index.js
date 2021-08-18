const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DBConfig = require('../config/database.config');
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    DBConfig.POSTGRES_DB, 
    DBConfig.POSTGRES_USER, 
    DBConfig.POSTGRES_PASSWORD, {
      host: DBConfig.POSTGRES_HOST,
      dialect: 'postgres'
    },
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
