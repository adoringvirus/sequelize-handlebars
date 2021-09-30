const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { signIn, signUp, logout, verifyEmail, verifyToken, activateUser } = require('../../controller/auth.controller');
const { isValidBody } = require('../../middlewares/validation.middleware');
const UserSchema = require('../../validation/UserSchema');

const AuthRouter = Router();

AuthRouter.get('/auth/signin',passport.authenticate('local',{
  failureRedirect: '/not-found'
}),signIn);

AuthRouter.post('/auth/signup',isValidBody(UserSchema()),signUp);
AuthRouter.get('/auth/logout',logout);
AuthRouter.get('/authenticate',async (req,res)=>{

  const singed = jwt.sign({user:'lui',id:2,email:'auth@gmail.com'},'SECRET');
  return res.json({
    jwt:singed
  })
})
AuthRouter.get('/auth/verify-email/:tokenId',verifyEmail);
AuthRouter.get('/auth/activate-user/:tokenId',verifyToken);
AuthRouter.post('/auth/activate-user',activateUser);
// AuthRouter.get('/auth/reset-password');
// AuthRouter.get('/auth/change-email');

module.exports = AuthRouter;