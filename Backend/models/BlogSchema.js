const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'job title is required'],
            trim: true
        },
        description: {
            type: String,
        },
        author: {
            type: String,
        },
        publishedDate: {
            type: String,
        },
        category: {
            type: String,
        },
        techstack: {
            type: [String],
            required: [true, 'tech stack is required'],
            trim: true
        },
        
        
        
    }
)

module.exports=mongoose.model("Blog", blogSchema)