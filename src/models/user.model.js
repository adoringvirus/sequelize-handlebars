const Sequelize = require('sequelize');
const { USERS } = require('../config/database.tables');
const CommentsModel = require('./comments.model');
const LikeModel = require('./like.model');
const UsersFeaturesRelationModel = require('./relations/user-features-users.model');
const ReviewsModel = require('./reviews.model');
const UserFeaturesModel = require('./user-features.model');
const UserStatusModel = require('./user-status.model');
const sequelize = require('../database/database').bootstrap();
const bcrypt = require('bcrypt');


const UserModel = sequelize.define(USERS,{
  user_username: {
    type: Sequelize.STRING
  },
  user_first_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  user_last_name:{
    allowNull: false,
    type: Sequelize.STRING
  },
  user_phone:{
    type: Sequelize.STRING
  },
  user_email:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isEmail: true,
    },
    unique: true
  },
  user_password: {
    allowNull: false,
    type: Sequelize.STRING
  },
  user_avatar: {
    type: Sequelize.STRING
  },
  user_verify_token: {
    type: Sequelize.STRING
  },
  user_last_login_at: {
    type: Sequelize.DATE
  },
  user_last_ip_address: {
    type: Sequelize.STRING
  },
  role_id: {
    type: Sequelize.INTEGER,
  },
  status_id: {
    type: Sequelize.INTEGER,
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  },
  created_by: {
    type: Sequelize.DATE
  },
  updated_by: {
    type: Sequelize.DATE
  }
},{ 
  getterMethods: {
    fullName() {
      return this.user_first_name + ' ' + this.user_last_name;
    }
  },
  hooks:{
    beforeCreate : async (user,options)=>{
      try {
        const hashedPassword = await bcrypt.hash(user.user_password,10);
        user.user_password = hashedPassword;
      } catch (error) {
        console.log(error)
      }
    }
  },
  // instanceMethods:{
  //   // validPassword
  // },
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  updatedAt: "updated_at",
  createdAt: "created_at"
})


// * User Features Relation
UserModel.belongsToMany(UserFeaturesModel,{
  through: UsersFeaturesRelationModel,
  foreignKey:'user_id',
})

UserFeaturesModel.belongsToMany(UserModel,{
  through: UsersFeaturesRelationModel,
  foreignKey: 'user_feature_id',
  onDelete:'CASCADE'
})

// * Comments Relation
CommentsModel.belongsTo(UserModel,{
  foreignKey: 'user_id',
})
UserModel.hasMany(CommentsModel)

// * Reviews Relation
ReviewsModel.belongsTo(UserModel,{
  foreignKey:'user_id'
})
UserModel.hasMany(ReviewsModel)

// * Like Relation
LikeModel.belongsTo(UserModel,{
  foreignKey:'user_id'
})
UserModel.hasMany(LikeModel)

// * Status Relation
UserModel.belongsTo(UserStatusModel,{
  foreignKey: {
    name:'status_id',
    type: Sequelize.DataTypes.INT
  }
});

UserStatusModel.hasMany(UserModel,{
  foreignKey: {
    name:'status_id',
    type: Sequelize.DataTypes.INT
  }
})

module.exports = UserModel