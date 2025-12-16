const postmodel = require("../models/postModel");
const usermodel = require("../models/userModel");

// Create a new post with images/videos
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }       
        const authorId = req.user._id;
        const { title, content, tags } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }   
        
        // Handle file uploads
        const images = [];
        const videos = [];
        
        if (req.files) {
            if (req.files.images) {
                req.files.images.forEach(file => {
                    images.push(`/uploads/images/${file.filename}`);
                });
            }
            if (req.files.videos) {
                req.files.videos.forEach(file => {
                    videos.push(`/uploads/videos/${file.filename}`);
                });
            }
        }
        
        // Also accept images/videos from body (for URLs)
        const bodyImages = Array.isArray(req.body.images) ? req.body.images : [];
        const bodyVideos = Array.isArray(req.body.videos) ? req.body.videos : [];
        
        const newPost = new postmodel({
            authorId,
            title,
            content,        
            tags: tags || [],
            images: [...images, ...bodyImages],
            videos: [...videos, ...bodyVideos]
        });
        
        const data = await newPost.save();
        
        // Populate author info
        await data.populate('authorId', 'name email');
        
        res.status(201).json({  
            message: "Post created successfully",
            data
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }       
};

// Get all posts with author details
const getAllPosts = async (req, res) => {
    try {
        const posts = await postmodel.find().populate('authorId', 'name email phone batch branch');
        
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        
        res.status(200).json({
            message: "Posts retrieved successfully",
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        
        const post = await postmodel.findById(postId).populate('authorId', 'name email phone batch branch');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.status(200).json({
            message: "Post retrieved successfully",
            data: post
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Get posts by a specific user
const getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const posts = await postmodel.find({ authorId: userId }).populate('authorId', 'name email phone batch branch');
        
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        
        res.status(200).json({
            message: "User posts retrieved successfully",
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const { postId } = req.params;
        const { title, content, tags } = req.body;
        
        const post = await postmodel.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Check if user is the author
        if (post.authorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }
        
        // Update text fields
        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = tags;
        
        // Handle new file uploads
        if (req.files) {
            if (req.files.images) {
                const newImages = [];
                req.files.images.forEach(file => {
                    newImages.push(`/uploads/images/${file.filename}`);
                });
                post.images = [...(post.images || []), ...newImages];
            }
            if (req.files.videos) {
                const newVideos = [];
                req.files.videos.forEach(file => {
                    newVideos.push(`/uploads/videos/${file.filename}`);
                });
                post.videos = [...(post.videos || []), ...newVideos];
            }
        }
        
        // Handle images/videos from body (for URLs or replacement)
        if (Array.isArray(req.body.images)) {
            post.images = req.body.images;
        }
        if (Array.isArray(req.body.videos)) {
            post.videos = req.body.videos;
        }
        
        const updatedPost = await post.save();
        await updatedPost.populate('authorId', 'name email phone batch branch');
        
        res.status(200).json({
            message: "Post updated successfully",
            data: updatedPost
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const { postId } = req.params;
        
        const post = await postmodel.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Check if user is the author
        if (post.authorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }
        
        await postmodel.findByIdAndDelete(postId);
        
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Add a comment to a post
const addComment = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const { postId } = req.params;
        const { commentText } = req.body;
        
        if (!commentText) {
            return res.status(400).json({ message: 'Comment text is required' });
        }
        
        const post = await postmodel.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const newComment = {
            userId: req.user._id,
            commentText,
            commentedAt: new Date()
        };
        
        post.comments.push(newComment);
        const updatedPost = await post.save();
        await updatedPost.populate('authorId', 'name email phone batch branch');
        
        res.status(200).json({
            message: "Comment added successfully",
            data: updatedPost
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

// Like/Unlike a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        
        const post = await postmodel.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        post.likes = (post.likes || 0) + 1;
        const updatedPost = await post.save();
        await updatedPost.populate('authorId', 'name email phone batch branch');
        
        res.status(200).json({
            message: "Post liked successfully",
            data: updatedPost
        });
    } catch (error) {
        res.status(400).json({ message: "Error occurred: " + error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost,
    addComment,
    likePost
};