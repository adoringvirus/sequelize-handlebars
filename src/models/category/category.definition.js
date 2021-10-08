const { DataTypes } = require('sequelize')
const globalDefinition = require('../global-columns-definition');

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_name: {
    type:DataTypes.STRING,
    unique: true,
    validate:{
      isLowercase: true, 
    }
  },
  category_description: DataTypes.STRING,
  ...globalDefinition
}