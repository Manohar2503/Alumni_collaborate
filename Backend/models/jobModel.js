const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    company : {
        type: String,
        required : [true, "please enter the company name"]
    },
    location:{
        type: String,
        required : [true, "please enter the location"]
    },
    role :{
        type: String,
        required : [true, "please enter the job role"]
    },
    type:{
        type:String,
        required : [true, "please enter the job type"]
    },
  
    link:{
        type: String,
        required : [true, "please enter the apply link"]
    },
    skills:{
        type: String,
        required : [true, "please enter the skills"]
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model("job",jobSchema);