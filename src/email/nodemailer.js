const nodemailer = require('nodemailer');;

let mailOptions = {
  from: `tomerpacific@gmail.com`,
  to: `wanders1995@hotmail.com`,
  subject: 'Nodemailer Project',
  text: 'Hi from your nodemailer project'
}


module.exports = {
  async setTransporter(_mailOptions=mailOptions){
    return  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
  }
}

