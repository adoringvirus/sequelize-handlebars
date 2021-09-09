const Sequelize = require('sequelize');
const sequelize = require('../database/database').bootstrap();

const TaskModel = sequelize.define('task',{
  task_name: {
    type: Sequelize.STRING
  },
  task_title: Sequelize.INTEGER,

},{
  timestamps: false,
  freezeTableName: true,
  underscored:true
});



module.exports = TaskModel;