

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
    if(!req.user){return res.status(401).json({message: 'You are not authorized'})}  
    req.user = req.session.passport.user;

    const {  user_status,user_role,user_features } = req.session.passport.user;
    
    const userStatus = user_status.user_status_name || null;
    const userRole = user_role.user_role_name || null;
    const userFeature = user_features || null;

    if( !req.isAuthenticated() ) { return res.status(401) };
    if( userStatus !== 'active' ) { return res.json({message:'User is Inactive'}) };
    if( userRole !== 'superadmin' ) { return res.json({message:'User is not super-admin'}) };
    
    next();
  }
}