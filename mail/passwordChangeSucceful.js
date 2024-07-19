require('dotenv').config()
const nodemailer = require('nodemailer');

const sendMail = async ({ email, user})=>{

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

    subject: 'Password change request ✔',

    html: `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <p> 
      Hi ${user} \n 

      reset your password was successful  \n\n 

      If you did not request this, please ignore this email and your password will remain unchanged.\n

      </p>

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