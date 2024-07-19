const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

require('dotenv').config()



const UserSchema = new mongoose.Schema({

    email: String,

    username:String,

    password: String,

    firstName: String,

    lastName: String
    

}, 

{timestamps: true});


module.exports = mongoose.model('contacts', UserSchema);