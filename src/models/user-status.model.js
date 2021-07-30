const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const { USER_STATUS } = require('../config/database.tables');
const sequelize = require('../database/database').bootstrap();

class UserStatusModel extends Model {}
UserStatusModel.init({
  user_status_name: {
    type: Sequelize.STRING
  },
  user_status_description: {
    allowNull: false,
    type: Sequelize.STRING
  }
},{
  sequelize,
  modelName:'user_status',
  timestamps: false,
  freezeTableName: true,
  underscored: true,
})


module.exports = UserStatusModel;