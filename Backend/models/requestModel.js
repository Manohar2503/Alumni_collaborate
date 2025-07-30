const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

fromUserId :{
    type: mongoose.Schema.Types.ObjectId,
    required: true
},

toUserId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true
},

status :{
    type : String ,
    required: true,
    enum : {
        values : ["ignore" , "intrested", "accepted", "rejected"],
        message : `{VALUE} is incorrect type`
    }
    
},
},
{
    timestamps:true,
})

module.exports = mongoose.model("RequestModel",requestSchema);