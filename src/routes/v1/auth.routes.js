const { Router } = require('express');
const passport = require('passport');

const { signIn, signUp, logout } = require('../../controller/auth.controller');

const AuthRouter = Router();

AuthRouter.get('/auth/signin',passport.authenticate('local',{
  failureRedirect: '/not-found'
}),signIn);

AuthRouter.post('/auth/signup',signUp);
AuthRouter.get('/auth/logout',logout)

module.exports = AuthRouter;