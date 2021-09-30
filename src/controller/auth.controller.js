const { createUser, findOneUser, updateOneUser } = require('../services/user.service');
const jwt = require('jsonwebtoken');
const os = require('os')
const fs = require('fs-extra');
const {decryptPrivate,encryptPublic} = require('../utils/encryptation.util');
const { setTransporter } = require('../email/nodemailer');
const { RESPONSES } = require('../responses/response');
const { getStatus, getRole } = require('../services/util.service');
const { JWT_SECRET, JWT_ENCRYPTED_SECRET } = require('../config/index')

const public = fs.readFileSync(__dirname + "/id_rsa_priv.pem","utf8");
const private = fs.readFileSync(__dirname + "/id_rsa_priv.pem","utf8");


module.exports  = {
  async signIn(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    res.status(200).json({
      message:'',
      data: req.user
    })
  },
  async signUp (
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const _status = await getStatus('inactive');
    const _role = await getRole('user');

    if(_role.internalError || _role.error) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Something went wrong in server',
      data: null
    })

    if(_status.internalError || _status.error) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Something went wrong in server',
      data: null
    })

    const user = await createUser({
      ...req.body,
      status_id: _status.id,
      role_id: _role.id
    });



    if(!user) { return res.status(400).json({ error: '' })} 

    const payloadData = {
      email: user.user_email,
      activation_code: user.user_verify_token
    }

    const encryptedPayload = encryptPublic(public,payloadData);
    
    const jwtToken = jwt.sign({secret:encryptedPayload},JWT_ENCRYPTED_SECRET,{
      expiresIn:"8min",
      jwtid: '2s%3d%g3sdv',
      issuer: os.hostname(),
    });

    const mailOptions = {
      from: `tomerpacific@gmail.com`,
      to: `wanders1995@hotmail.com`,
      subject: 'Nodemailer Project',
      text: `Click on the link to activate account ${jwtToken}`
    }

    await setTransporter(mailOptions).sendMail();

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'User registered',
      data: null
    })
  },

  async logout(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    req.logOut()
    return RESPONSES.OK(res,{
      path: req.originalUrl,
      message: 'User logged out',
      data: null
    })
  },
  async resetPassword(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    
  },async activateUser(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    
    const { id:userId,user_password } = req.body;

    const _status = await getStatus('active');

    if(_status.internalError || _status.error) return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      message: 'Something went wrong in server',
      data: null
    })

    const updatedUser = await updateOneUser({
      user_password,
      status_id: _status.id
    },{id:userId});

    if(!updatedUser) return RESPONSES.INTERNAL_ERROR(res,{
      path: req.originalUrl,
      code: 500,
      data: null,
      message: 'Could not update user',
    })
    
    if(updatedUser.length === 0){ return RESPONSES.BAD_REQUEST(res,{
      path: req.originalUrl,
      data: null,
      message: 'No user found',
    })}

    return RESPONSES.OK(res,{
      path: req.originalUrl,
      code: 200,
      message: 'User updated',
      data: updatedUser,
    })
  },
  async verifyToken(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    const { tokenId } = req.params;
    try {
      const decodedData = await jwt.verify(tokenId,JWT_SECRET)
      const user = await findOneUser({id:decodedData.userId})

      if(!user) return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        message: 'User does not exist',
        data: null
      })
      
      user.user_password = undefined;

      return RESPONSES.OK(res,{
        path: req.originalUrl,
        message: 'User activated. Please set a password',
        data: user
      })
    } catch (error) {
      console.log(`error`, error)
      return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 403,
        message: 'Invalid Token'
      })
    }
  },
  async changeEmail(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){

  },
  async verifyEmail(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    try {
      jwt.verify(req.params.tokenId, JWT_SECRET)
    } catch (error) {
      return res.json({message:'not valid token'})
    }

    const decodedjwt = jwt.decode(req.params.tokenId);

    const userData = decryptPrivate(private,decodedjwt.secret);

    const user = await findOneUser({user_email:userData.email});

    
    if( userData.activation_code === user.user_verify_token){
      
      const _status = await getStatus('active')
      
      const updatedUser = await updateOneUser({
        status_id: _status.id,
        user_verified: true
      },{id:user.id});
      
      return  RESPONSES.OK(res,{
        path: req.originalUrl,
        message: 'User verified',
        data: updatedUser
      })
    }else{
      return RESPONSES.BAD_REQUEST(res,{
        path: req.originalUrl,
        code: 403,
        message: 'Invalid Token'
      })
    }
    // console.log(routeToBeSent)
  }
}