const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true      
    },
    title: {
        type: String,
        required: [true, 'Post title is required']
    },
    content: {
        type: String,
        required: [true, 'Post content is required']
    },
    tags: {         
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {         
        type: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                commentText: {  
                    type: String,
                    required: true
                },
                commentedAt: {      
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    videos: {
        type: [String],
        default: []
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('Post', postSchema);
