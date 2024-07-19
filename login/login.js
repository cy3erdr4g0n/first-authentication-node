const userModel = require('../models/auth.models')

const jwt = require('jsonwebtoken')

const validate = require('../middlerwares/login')

const { compare } = require('../sevice/crypto')

const secret = process.env.SECRET

const loginVerify = async (req, res)=>{

    try {
        
        let { email, password } = req.body;

        let withMessage = validate(req.body)

        if (withMessage.isValid == true){

            let user = await userModel.findOne({
    
                email : email
    
            });

            if (!user){
    
                res.status(404).json({
    
                    message : "USER NOT FOUND"
    
                });
    
                throw Error("USER NOT FOUND");
    
            }else{
    
    
                let hashedPassword = user.password

                const validate = await compare(password, hashedPassword);

                if(!validate){

                    res.status(202).json("Invalid detail");
                            
                    throw new Error("Invalid detail");

                }else{

                    let userDetails = { email };
        
                    const token = jwt.sign(userDetails,secret,{expiresIn:10});
        
                    res.status(201).json({

                        message:'sign in successful',
        
                        token:token
                    });
    
    
                };
    
            };

        }else{

            res.status(401).json({            
    
                message : `Invalid Credential`
    
            }); 

        }

    }catch (error) {
        
        res.status(401).json({

            'message' : "INTERNAL SERVER ERROR"

        });

        throw Error(error);

    };

};

module.exports = {

    loginVerify

};