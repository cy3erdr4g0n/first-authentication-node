const userModel = require('../models/auth.models');

const crypto = require('crypto');

const { sendMail } = require('../mail/passwordresetmail');

const generatePasswordReset = async (req,res)=>{
    
    let resetToken  = crypto.randomBytes(32).toString('hex')
    try {

        let email = req.body.email;

        
        if (!email){

            res.status(202).json("Empty otp detail are not allowed ");

            throw Error("Empty otp detail are not allowed ");

        }else{

            const user = await userModel.findOne({

                email: email

            });


            if (!user){
                
                // no record found 

                res.status(202).json("Account Record dosen't exit");

                throw new Error("Account Record dosen't exit");

            }else{
            
                resetPasswordExpiredTime = Date.now() + 360000
                
                let head = req.headers.host
                await userModel.findOneAndUpdate(
                    
                    { email : email }, 

                    { resetPasswordToken : resetToken, resetPasswordExpires : resetPasswordExpiredTime }

                    )
                .then(async (result)=>{
                    await sendMail({
                        
                        email : result.email,
                        
                        user :  result.username,
                        
                        token : resetToken,
                        
                        headered : head,

                        userId : result._id
                        
                    });

                });
                res.status(202).json({

                    status: "SENDED",

                    message:"VERIFY CODE HAVE BEEN SENT TO YOUR MAIL"

                });

            };

        };

    } catch (error) {

        res.status(202).json({            
            
            status : "FAILED",

            message : "An error occur when creating the account"

        });
        
    };
    
};

module.exports = {

    generatePasswordReset

};