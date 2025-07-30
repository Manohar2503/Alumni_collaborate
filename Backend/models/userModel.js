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
    phone :{
        type: Number,
        required : [true,'enter your phone number'],
        unique: true,
        minlength : [10,'enter a valid phone number'],
        maxlength : [10,'enter a valid phone number']   
    },

    batch:{
        type: String,
        required : [true, "enter the batch"]
    },

    branch : {
        type:String,
        required:[true,'enter the brach']
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