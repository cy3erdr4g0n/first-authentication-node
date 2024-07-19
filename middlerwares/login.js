const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports =  function validateRegister(body){

        let errors = {};
        
        body.email = !isEmpty(body.email) ? body.email : "";
        
        body.password = !isEmpty(body.password) ? body.password : "";
    
        if (Validator.isEmpty(body.email)) {
    
            errors.email = "Email field is required";
    
        } else if (!Validator.isEmail(body.email)) {
    
            errors.email = "Email is invalid";
    
        }
        if (Validator.isEmpty(body.password)) {
    
            errors.password = "Password field is required";
    
        }
        
        if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
    
            errors.password = "Password must be at least 6 characters";
    
        }

      return {

        errors,

        isValid: isEmpty(errors)

       };


};