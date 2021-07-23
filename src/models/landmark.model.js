const Sequelize = require('sequelize');

const Landmark = Sequelize.define('landmark',{
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  location: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  }
},{})

module.exports = Landmark