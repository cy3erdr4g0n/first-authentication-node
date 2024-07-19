const express = require('express')

const router = express.Router()

const validate = require('../middlerwares/Useremail')

const sended = require('../signup/index')

const activate = require('../activateAcct/activateUsers')

const newotp = require('../otp/requestedOtp')

const reset = require('../passwordReset/passwordResetToken')

const changePasswd = require('../passwordReset/changePassword')

const resetPassword = require('../passwordReset/passwordReset')

const login = require('../login/login')


router.post('/auth/registration', sended.sigup); // signup

// router.post('/auth/activate', [validate.validateEmail, activate.activateUser]); // to activate a user

// router.post('/auth/otp', [validate.validateEmail,newotp.newOtp]); // to request for new otp

// router.post('/recover', [validate.validateEmail,reset.generatePasswordReset]); // for forgetten password 

router.get('/reset/:userId/:token') //  to display the form page for the password reset

// router.post('/reset/:userId/:token', [validate.validatePassword, resetPassword.newPassword]) // for reset of password 

// router.post('/change/password', [validate.validatePassword, changePasswd.changePassword]) // for change of password 

router.post('/auth/login', login.loginVerify) // for login

module.exports = router