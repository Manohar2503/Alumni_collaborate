const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    review:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        min: 1,
        max: 5,
    }
},
{timestamps: true});
module.exports=mongoose.model("Review", reviewSchema)