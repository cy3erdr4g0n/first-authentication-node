const Validator = require("validator");

const isEmpty = require("is-empty");

const  validateRegister = (body)=>{

        let errors = {};
        
        body.firstName = !isEmpty(body.firstName) ? body.firstName : "";
        
        body.lastName = !isEmpty(body.lastName) ? body.lastName : "";

        body.username = !isEmpty(body.username) ? body.username : "";
        
        body.email = !isEmpty(body.email) ? body.email : "";
        
        body.password = !isEmpty(body.password) ? body.password : "";
    
        if (Validator.isEmpty(body.email)) {
    
            errors.email = "Invalid Credential"
    
        } else if (!Validator.isEmail(body.email)) {
    
            errors.email = "Invalid Credential";
    
        }
        if (Validator.isEmpty(body.password)) {
    
            errors.password = "Invalid Credential";
    
        }
        
        if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    
            errors.password = "Invalid Credential";
    
        }
    
        if (Validator.isEmpty(body.firstName)) {
    
            errors.firstName = "Invalid Credential";
    
        }
    
        if (!Validator.isLength(body.firstName, { min: 3, max: 30 })) {
    
            errors.firstName = "Invalid Credential";
    
        }
    
        if (Validator.isEmpty(body.lastName)) {
    
            errors.lastName = "Invalid Credential";
    
        }
    
        if (!Validator.isLength(body.lastName, { min: 3, max: 30 })) {
    
            errors.lastName = "Invalid Credential";
    
        }

        if (Validator.isEmpty(body.username)) {
    
            errors.username = "Invalid Credential";
    
        }
    
        if (!Validator.isLength(body.username, { min: 3, max: 30 })) {
    
            errors.username = "Invalid Credential";
    
        }


      return {

        errors,

        isValid: isEmpty(errors)

       };


};

module.exports = {

    validateRegister
}