const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../database/database').bootstrap();

const CommentsModel = require('../comments/comments.model');
const LikeModel = require('../like/like.model');
const UsersFeaturesRelationModel = require('../relations/user-features-users.model');
const ReviewsModel = require('../reviews/reviews.model');
const UserFeaturesModel = require('../user-features/user-features.model');
const UserStatusModel = require('../user-status/user-status.model');
const UserDefinition = require('./user.definition');

const globalSqlOptions = require('../global-sql-options');


const UserModel = sequelize.define('users',UserDefinition,{ 
  getterMethods: {
    fullName() {
      return this.user_first_name + ' ' + this.user_last_name;
    }
  },
  hooks:{
    beforeCreate: async (user,options)=>{
      try {
        const hashedPassword = await bcrypt.hash(user.user_password,10);
        user.user_password = hashedPassword;
      } catch (error) {
        console.log(error)
      }
    },
    beforeUpdate: async (user,options)=>{
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
  paranoid: true,
  ...globalSqlOptions
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
    type: DataTypes.INT
  }
});

UserStatusModel.hasMany(UserModel,{
  foreignKey: {
    name:'status_id',
    type: DataTypes.INT
  }
})

module.exports = UserModel