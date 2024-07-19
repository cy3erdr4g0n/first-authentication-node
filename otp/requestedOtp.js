const userModel = require('../models/auth.models');

const { sendMail }  = require('../mail/mail'); 

const { encrypt } = require('../sevice/crypto')

const otpGenerator = require('otp-generator')

const newOtp = async (req, res)=>{

    try {

        let email = req.body.email;
        
        if (!email){

            res.status(202).json("Empty email detail are not allowed ");

            throw Error("Empty email detail are not allowed ");

        }else{

            const UserVerification = await userModel.findOne({

                email : email

            });

            if (!UserVerification){

                // no record found 

                res.status(202).json("Account Record dosen't exit");

                throw new Error("Account Record dosen't exit");

            }else{

                let otp = otpGenerator.generate(6, { upperCaseAlphabets : false, specialChars : false});
        
                let otpcode = `${otp}`;

                const active  = UserVerification.active;

                const hashedOtp = await encrypt(otpcode);

                if (active == false) {
            
                    userModel.findOneAndUpdate({email : email}, {otp : hashedOtp, timeOptCreate: Date.now(), timeOptExpired : Date.now() + 36000000})
                    .then(async (result)=>{
                        await sendMail({
    
                            email : result.email,
    
                            otp: otpcode
    
                        });
    
                    });
    
                    res.status(202).json({
    
                        status: "PENDING",
            
                        message:"VERIFY CODE HAVE BEEN SENT TO YOUR MAIL"
            
                    });
    
                } else {
                        
                    res.status(202).json({
    
                        message : "account has been verify "
    
                    });

                };

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

    newOtp
    
};