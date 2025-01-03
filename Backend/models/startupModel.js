const mongoose = require("mongoose");
const startupSchema = mongoose.Schema({

ideaTitle : {
    type: String,
    required : [true,'enter a title']
},
username : {
    type: String,
    required : [true,'enter your name'],
},
email : {
    type: String,
    required : [true,'enter your mail'],
},
contact : {
    type: Number,
    required : [true,'enter your contact'],
},
description : {
    type: String,
    required : [true,'enter your description'],
},
idea : {
    type: String,
    required : [true,'enter your idea'],
}
},
{
    timestamps:true

});

const Startup = mongoose.model('Startup',startupSchema);
module.exports = Startup;