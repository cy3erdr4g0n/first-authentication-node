const userModel = require('../models/auth.models')

const { encrypt } = require('../sevice/crypto')

const { sendMail } = require("../mail/passwordChangeSucceful")

const newPassword = async (req, res)=>{

    try {
        let user = await userModel.findOne({

            _id : req.params.userId,

            resetPasswordToken : req.params.token
            
        });
        

        if(!user){

            res.status(202).json("invalid link ");

            throw Error("invalid link or or expired");

        }else{
            
            if (  user.resetPasswordExpires == null ||user.resetPasswordExpires < Date.now() ){
                
                
                res.status(202).json(" token has expired require for another token ");
                
                throw new Error(" token has expired require for another token ");
                
            }else{

                let newGeneratePassword = req.body.password;

                const hashedPassword = await encrypt(newGeneratePassword);

                    await userModel.findOneAndUpdate({_id : req.params.userId}, {password : hashedPassword,  resetPasswordToken:null, resetPasswordExpires:null})
                    .then(async (result)=>{

                        await sendMail({

                            user : result.username,

                            email : result.email

                        });

                    });

                    res.status(202).json({
        
                        status: "successful",
                            
                        message:"MAIL HAVE BEEN SENT TO YOU"
            
                    });

            };

            };

    } catch (error) {
        
        res.status(202).json("server error")
        
        throw new Error("server error")

    }

}

module.exports = {

    newPassword

}