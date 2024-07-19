const userModel = require('../models/auth.models')

const { compare } = require('../sevice/crypto')

const activateUser = async (req, res)=>{

    try {

        let {email, otp} = req.body;

        if (!email ||  !otp){

            res.status(202).json("Empty otp detail are not allowed ")

            throw Error("Empty otp detail are not allowed ");

        }else{

            const UserOtpverification = await userModel.findOne({

                email: email

            });

            if (!UserOtpverification){

                // no record found 

                res.status(202).json("Account Record dosen't exit")

                throw new Error("Account Record dosen't exit")

            }else{

                // user otp record exist 

                const hashedOTP = UserOtpverification.otp;

                if (Date.now() > UserOtpverification.timeOptExpired || UserOtpverification.timeOptExpired == null){

                    // otp has expired 

                    res.status(202).json("code has expired. required for another otp")

                    throw new Error("code has expired. required for another otp")

                }else{
                    
                    let pin = `${otp}`
                    
                    const validOTP = await compare(pin,hashedOTP);

                    if (!validOTP){

                        res.status(202).json("Invalid otp check your Email")
                        
                        throw new Error("Invalid otp check your Email")
                        

                    }else{

                        await userModel.findOneAndUpdate({email: email}, {active: true, timeOptExpired: null, timeOptCreate : null, otp : null})

                        res.json({

                            "status" : "VERIFY",

                            "message" : "USER EMAIL HAS BEEN VERIFY"
                            
                        })

                    }
                    
                };
            };

        };

    } catch (error) {
        
        res.json({

            "status" : "FAILED",

            "message" : error.message
            
        });

    };

};

module.exports = {

    activateUser

}