const Sequelize = require('sequelize');
const { USERS } = require('../config/database.tables');
const CommentsModel = require('./comments.model');
const MovieModel = require('./movie.model');
const MovieCategoryRelationModel = require('./relations/movies-category.model');
const UsersFeaturesRelationModel = require('./relations/user-features-users.model');
const UserMovieCommentsRelation = require('./relations/users-movies-comments.model');
const UserFeaturesModel = require('./user-features.model');
// const UserRolesModel = require('./user-roles.model');
const UserStatusModel = require('./user-status.model');
const sequelize = require('../database/database').bootstrap();

const UserModel = sequelize.define(USERS,{
  users_username: {
    type: Sequelize.STRING
  },
  users_first_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  users_last_name:{
    allowNull: false,
    type: Sequelize.STRING
  },
  users_phone:{
    type: Sequelize.STRING
  },
  users_email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  users_password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  users_avatar: {
    type: Sequelize.STRING
  },
  users_last_login_at: {
    type: Sequelize.DATE
  },
  users_last_ip_address: {
    type: Sequelize.STRING
  },
  users_roles_id: {
    type: Sequelize.UUID,
  },
  users_status_id: {
    type: Sequelize.UUID,
  },
  users_created_at: {
    type: Sequelize.DATE
  },
  users_updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  },
  users_created_by: {
    type: Sequelize.DATE
  },
  users_updated_by: {
    type: Sequelize.DATE
  }
},{ 
  getterMethods: {
    fullName() {
      return this.users_first_name + ' ' + this.users_last_name;
    }
  },
  defaultScope: {
    attributes: { 
      exclude: ['createdAt','updatedAt'] 
    }
  }, 
  hooks:{
    // beforeCreate
  },
  instanceMethods:{
    // validPassword
  },
  timestamps: false,
  freezeTableName: true
})

// UserRolesModel.hasMany(UserModel,{
//   foreignKey: 'users_id',
// })


UserModel.belongsToMany(MovieModel,{
  through: UserMovieCommentsRelation,
  foreignKey:'users_id'
})

MovieModel.belongsToMany(UserModel,{
  through: UserMovieCommentsRelation,
  foreignKey:'movies_id'
})


// UserModel.belongsTo(UserRolesModel,{
//   foreignKey: 'users_id'
// })

// UserRolesModel.hasMany(UserModel,{
//   foreignKey: 'users_id',
// })

UserModel.belongsToMany(CommentsModel,{
  through: UserMovieCommentsRelation,
  foreignKey: 'users_id',
})

CommentsModel.belongsToMany(UserModel,{
  through: UserMovieCommentsRelation,
  foreignKey: 'comments_id',
})

UserModel.belongsToMany(UserFeaturesModel,{
  through: UsersFeaturesRelationModel,
  foreignKey:'users_id',
})

UserFeaturesModel.belongsToMany(UserModel,{
  through: UsersFeaturesRelationModel,
  foreignKey: 'user_features_id',
  onDelete:'CASCADE'
})



UserModel.belongsTo(UserStatusModel,{
  foreignKey: {
    name:'users_status_id',
    type: Sequelize.DataTypes.UUID
  }
});

UserStatusModel.hasMany(UserModel,{
  foreignKey: {
    name:'users_status_id',
    type: Sequelize.DataTypes.UUID
  }
})

module.exports = UserModel