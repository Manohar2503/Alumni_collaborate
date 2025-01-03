const mongoose = require('mongoose');
const mentorSchema = mongoose.Schema({

image :{
    type:String,
    required : [true,'enter an image URL']
},

topic :{
    type:String,
    required : [true,'enter the topic name']
},

video:{
    type:String,
    required : [true,'enter a video link']
}

},
{
    timestamps:true
});

module.exports = mongoose.model('Mentor',mentorSchema);

