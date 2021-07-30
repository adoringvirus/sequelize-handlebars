const Sequelize = require('sequelize');
const { USER_ROLES } = require('../config/database.tables');
const UserModel = require('./user.model');
const sequelize = require('../database/database').bootstrap();

const UserRolesModel = sequelize.define(USER_ROLES,{
  user_roles_name: {
    type: Sequelize.STRING
  },
  user_roles_description: {
    type: Sequelize.STRING
  }
},{
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    },
  },
  timestamps: false,
  freezeTableName: true
})


UserModel.belongsTo(UserRolesModel,{
  foreignKey: {
    name:'users_roles_id',
    type: Sequelize.DataTypes.UUID
  }
})

UserRolesModel.hasMany(UserModel,{
  foreignKey: {
    name:'users_roles_id',
    type: Sequelize.DataTypes.UUID
  }
})

// 

// UserRolesModel.hasMany(UserModel,{
//   foreignKey: {
//     name:'users_roles_id',
//     type: Sequelize.DataTypes.UUID
//   }
// })

module.exports = UserRolesModel;