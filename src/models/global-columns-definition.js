const { DataTypes } = require('sequelize');

module.exports = {
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER
}