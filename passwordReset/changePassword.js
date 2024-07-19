const userModel = require('../models/auth.models');

const { sendMail } = require("../mail/passwordChangeSucceful");

const { encrypt, compare} = require('../sevice/crypto')

const changePassword = async (req, res)=>{
    
    try {
        
        let email = req.body.email;

        let oldpassword = req.body.oldpassword;

        if (!oldpassword || !email){

            res.status(202).json("Empty detail are not allowed ");

            throw Error("Empty detail are not allowed ");

        }else{

            const user = await userModel.find({

                email : email

            });

            if ( user.length <= 0 ){

                res.status(202).json("Account Record dosen't exit");

                throw new Error("Account Record dosen't exit");

            }else{

                let newpassword = req.body.password 

                let passworded = user[0].password

                const validate = await compare(oldpassword, passworded);

                if (!validate){

                    res.status(202).json("Invalid password");
                        
                    throw new Error("Invalid password");

                }else{

                    const hashedPassword = await encrypt(newpassword);
                   
                    await userModel.findOneAndUpdate({email : email}, {password : hashedPassword})
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

        };       
        
    } catch (error) {
        
        res.status(202).json({

            "messsage" : "error occur"

        });

        throw new Error(error);

    };

};

module.exports = {

    changePassword

}