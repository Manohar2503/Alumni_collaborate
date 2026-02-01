const mongoose=require("mongoose");

const oppurtunitySchema=new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'company name is required'],
            trim: true
        },
        role: {
            type: String,
            required: [true, 'role is required'],
            trim: true
        },
        link: {
            type: String,
            required: [true, 'link is required'],
            trim: true
        },
        type:{
            type:String,
        }
        
    },
    {
        timestamps: true
    }
)
module.exports=mongoose.model("Oppurtunity", oppurtunitySchema)