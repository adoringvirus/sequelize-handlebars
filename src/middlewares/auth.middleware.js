const { RESPONSES } = require('../responses/response');


module.exports = {
  isAuthenticated(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res,
    /** @type {import('express').NextFunction } */
    next 
  ){
    if( !req.isAuthenticated() ) { return res.status(401) };
    next();
  },
  isSuperAdmin(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res,
    /** @type {import('express').NextFunction } */
    next 
  ){
    // * if there is no user 
    if( !req.isAuthenticated() ) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code:401,
      message: 'You are not logged in',
      error: true,
      data: null
    })};

    req.user = req.session.passport.user;

    const {  user_status,user_role,user_features } = req.session.passport.user;
    
    const userStatus = user_status 
    ? user_status.user_status_name : null;

    const userRole = user_role.user_role_name || null;
    const userFeature = user_features || null;



    if( userStatus !== 'active' ) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code:401,
      message: 'User is not active',
      error: true,
      data: null
    })};

    if( userRole !== 'superadmin' ) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code:401,
      message: 'User is not superadmin',
      error: true,
      data: null
    })};

    next();
  },
  isLoggedIn(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res,
    /** @type {import('express').NextFunction } */
    next 
  ){
    // * if there is no user 
    if( !req.isAuthenticated() ) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code:401,
      message: 'You are not logged in',
      error: true,
      data: null
    })};

    req.user = req.session.passport.user;

    const {  user_status,user_role,user_features } = req.session.passport.user;
    
    const userStatus = user_status 
    ? user_status.user_status_name : null;

    const userRole = user_role.user_role_name || null;
    const userFeature = user_features || null;

    if( userStatus !== 'active' ) { return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      code:401,
      message: 'User is not active',
      error: true,
      data: null
    })};

    // if( userRole !== 'user' ) { return res.json({message:'Not a user'}) };
    
    next();
  }
}