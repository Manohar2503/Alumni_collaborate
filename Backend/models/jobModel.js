const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
company :{
    type: String,
    required: true
},
location :{
    type: String,
    required: true
},
jobrole :{
    type: String,
    required: true
},
jobtype :{
    type: String,
    required: true
},
posted:{
    type: Date,
    required: true
},
link:{
    type : String,
    required: true
},
skill:{
    type: String,
    required: true
},


})

module.exports = mongoose.model("Job", jobSchema);