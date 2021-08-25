const fs = require('fs-extra');
const crypto = require('crypto');

module.exports =  async (_path)=>{
  const rsaKeys = crypto.generateKeyPairSync('rsa',{
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
      passphrase: ''
    },
  })
  
  if(!_path) {
    // * Create the public key file
    await fs.writeFile(`${__dirname}/id_rsa_pub.pem`,rsaKeys.publicKey);
    // * Create the private key file
    await fs.writeFile(`${__dirname}/id_rsa_priv.pem`, rsaKeys.privateKey);
  }else{
    // * Create the public key file
    await fs.writeFile(`${_path}/id_rsa_pub.pem`,rsaKeys.publicKey);
    // * Create the private key file
    await fs.writeFile(`${_path}/id_rsa_priv.pem`, rsaKeys.privateKey);
  }
}