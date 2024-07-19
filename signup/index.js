const userModel = require('../models/auth.models');

const { encrypt } = require('../sevice/crypto')

const validate = require('../middlerwares/registe')

const sigup = async (req, res, next)=>{
    
    // try{
        
        let withMessage = await validate.validateRegister(req.body)

        if (withMessage.isValid == true){

            let { email , username, firstName, lastName} = req.body

            const user = await userModel.findOne({

                email : req.body.email

            })

            if (!user){
         
                const hashedPassword = await encrypt(req.body.password)
         
                    const newUser = await new userModel({
            
                        email, 
            
                        username,
            
                        password: hashedPassword,
            
                        firstName,
            
                        lastName,
            
                    });
                
                  await  newUser.save()
            
                    res.status(202).json({
            
                        message:"success"
            
                    });
                
            }else{

                res.status(402).json({            
        
                    message : `Invalid Credential`
        
                }); 

            }


        }else{

            res.status(401).json({            
    
                message : withMessage.errors
    
            }); 

        }
 

    // }catch(error){

    //     res.status(400).json({            
    
    //         message : `Invalid Credential`

    //     }); 

    // };

} 

module.exports = {

    sigup
    
}