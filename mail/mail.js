require('dotenv').config()
const nodemailer = require('nodemailer');

sendMail = async ({ email, otp })=>{

  try {

  
  let transporter = await nodemailer.createTransport(
    {
  
      service: "gmail",
  
      host : "smtp.gmail.com",
  
      port : 465,
  
      secure: true,
  
      auth: {
        
          user: process.env.MAIL_EMAIL,
  
          pass: process.env.MAIL_PASSWORD,
  
      }
  }
  );
  
  const mail = {

    from: process.env.MAIL_EMAIL,

    to: email,

    subject: 'Verify your email ✔',

    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2> Enter <b>${otp} </b> ✔ </h2>
      <h4> in the app to verify your email address and complete</h4>
      <p style="margin-bottom: 30px;">the code will <b> expired 1 hour </b></p>
    </div>`

  }

  let _rep = await transporter.sendMail(mail)

  if(_rep){
    
    let msg = `A code has been send to your email `

    return msg

  }

  return true

    
} catch (error) {
    
  throw error

}

}


module.exports = { sendMail }