const mongoose = require("mongoose");
const validator = require('validator');
 const userSchema = mongoose.Schema({

    name : {
        type: String,
        required : [true,'enter a name']
    },
    collegeMail : {
        type: String,
        required : [true,'enter your college mail'],
        unique: true,
      
    },
    email : {
        type: String,
        required : [true,'enter your mail'],
        unique : true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email format')
            }   
        }
    },
    password : {
        type: String,
        required : [true,'enter a password']
    }
 },
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema);