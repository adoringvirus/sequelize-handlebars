const { DataTypes } = require('sequelize')
const globalColumnsDefinition = require('../global-columns-definition')

module.exports = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_role_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate:{
      isLowercase: true, 
    }
  },
  user_role_description: DataTypes.STRING,
  deleted_at: DataTypes.DATE,
  deleted_by: DataTypes.INTEGER,
  ...globalColumnsDefinition
}