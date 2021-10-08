const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database').bootstrap();

class SessionModel extends Model {}
SessionModel.init({
  sid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  sess: {
    type: DataTypes.JSON,
    allowNull: false
  },
  expire: {
    type: DataTypes.DATE,
    allowNull: false
  }
},{
  indexes:[
    {
      name:'IDX_session_expire',
      fields: ['expire']
    }
  ],
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName:'session'
})


module.exports = SessionModel;