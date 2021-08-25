const { createUser, findOneUser } = require('../services/user.service');
const jwt = require('jsonwebtoken');
const os = require('os')
const fs = require('fs-extra');
const {decryptPrivate,encryptPublic} = require('../utils/encryptation.util')

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
    const user = await createUser({
      ...req.body
    });

    if(!user) { return res.status(400).json({ error: '' })} 

    const payloadData = {
      email: user.user_email,
      activation_code: user.user_verify_token
    }

    const encryptedPayload = encryptPublic(public,payloadData);
    
    const jwtToken = jwt.sign({secret:encryptedPayload},'@3da$5ygsd$5g42',{
      expiresIn:"8min",
      jwtid: '2s%3d%g3sdv',
      issuer: os.hostname(),
    });

    res.status(201).json({
      message: 'User registered',
      data: jwtToken
    })
  },

  async logout(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    req.logOut()
    res.status(200).json({
      message: 'user Log out successfully',
    })
  },
  async resetPassword(
    /** @type {import('express').Request } */
    req,
    /** @type {import('express').Response } */
    res
  ){
    
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
      jwt.verify(req.params.tokenId,'@3da$5ygsd$5g42')
    } catch (error) {
      return res.json({message:'not valid token'})
    }

    const decodedjwt = jwt.decode(req.params.tokenId);

    const userData = decryptPrivate(private,decodedjwt.secret);

    const user = await findOneUser({user_email:userData.email});


    if( userData.activation_code === user.user_verify_token){
      
      res.json({message: 'user activated'})
    }else{
      res.json({message:'token not valid'})
    }
    // console.log(routeToBeSent)
  }
}