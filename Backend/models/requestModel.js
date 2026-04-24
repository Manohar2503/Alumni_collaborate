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

requestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

module.exports = mongoose.model("RequestModel",requestSchema);
