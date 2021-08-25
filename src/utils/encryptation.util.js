const crypto = require('crypto')

module.exports = {
  encryptPublic(_publicKey,_payload){
      
    // * stringify data for the buffer since it does not allow objects
    const stringifyPayload = JSON.stringify(_payload);
  
    // * Transform data into buffer to 
    const bufferedPayload = Buffer.from(stringifyPayload,"utf8")
  
    const encryptedPayload = crypto.publicEncrypt({
      key: _publicKey,
      padding:crypto.constants.RSA_PKCS1_PADDING,
      passphrase: 'awda24tgvs134',
      // oaepHash: "sha256"
    },bufferedPayload)

    return encryptedPayload .toString("base64") // * return encrypted data
  },
  decryptPrivate (_privateKeyPath,_payload){

    // * buffer incoming base64 data into buffer
    const bufferedPayload = Buffer.from(_payload,"base64" )
  
    const decryptedMessage = crypto.privateDecrypt({
      key: _privateKeyPath,
      padding:crypto.constants.RSA_PKCS1_PADDING,
      passphrase: 'awda24tgvs134',
      // oaepHash: "sha256",
    },bufferedPayload)
  
    // * transform decryption into json
    return JSON.parse( decryptedMessage.toString() )
  }
}