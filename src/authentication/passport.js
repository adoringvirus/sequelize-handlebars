const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const UserStatusModel = require('../models/user-status.model');
const UserRolesModel = require('../models/user-roles.model');
const UserFeaturesModel = require('../models/user-features.model');

const authenticateUser = async (req,user_email, user_password, done)=>{
  try {
    const user = await UserModel.findOne({
      where:{
        user_email:user_email
      },
      include: [UserStatusModel,UserRolesModel,UserFeaturesModel]
    })

    // * Compare incoming password with database one
    // *
    const isCorrectPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    
    // * if password is incorrect
    if(!isCorrectPassword) { return done(null,false,{message:'wrong pass nigga'}) };
    
    // * Remove password from object
    user.user_password = undefined;

    return done(null,user);
  } catch (error) {
    return done(error,{message:'nop'})
  }
}

// * This is the information that will get save of the user cookie id
// * coming from the method that performs the user search
const _serializeUser = (user,done)=>{
  done(null,user)
}


// * Once user information is saved 
// * we do have access to the information or object we send in the above method
const _deserializeUser = async (_user, done)=> {
  try {
    const user = await UserModel.findOne({where:{
      id:_user.id
    }});
    // * You can return whatever you want to be used later on to retrieve user
    return done(null,user.id)
  } catch (error) {
    return done(error,_user.id)
  }
}

module.exports = (
  /** @type {import('passport') } */
  passport
)=>{
  // * This section will define the passport strategy to be used
  // * taking as a parameter a passport object and starting
  // * the configuration
  passport.serializeUser(_serializeUser);
  passport.deserializeUser(_deserializeUser)

  passport.use(new LocalStrategy.Strategy({
    // * to personalize the incoming fields have to set up object
    usernameField: 'user_email',
    passwordField: 'user_password',
    passReqToCallback: true,
    session: true // * in most cases if this is false is using jwt
  },authenticateUser))
}