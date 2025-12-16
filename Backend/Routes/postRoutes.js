const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost,
    addComment,
    likePost
} = require('../controller/postController');
const authMiddleware = require('../MiddleWares/authMiddleware');
const upload = require('../config/multer');

// Public routes
router.get('/all', getAllPosts); // Get all posts
router.get('/:postId', getPostById); // Get single post by ID
router.get('/user/:userId', getPostsByUser); // Get posts by specific user

// Protected routes (requires authentication)
// Upload multiple images and videos: upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }])
router.post('/create', authMiddleware, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), createPost); // Create new post with file uploads
router.put('/:postId', authMiddleware, upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), updatePost); // Update post with file uploads
router.delete('/:postId', authMiddleware, deletePost); // Delete post
router.post('/:postId/comment', authMiddleware, addComment); // Add comment to post
router.post('/:postId/like', likePost); // Like a post

module.exports = router;
