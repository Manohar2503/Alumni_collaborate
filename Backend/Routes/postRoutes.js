const express = require('express');
const router = express.Router();
const authMiddleware = require('../MiddleWares/authMiddleware');
const upload = require('../config/multer');

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  addComment,
  likePost
} = require('../controller/postController');

// Public routes
router.get('/all', getAllPosts);
router.get('/user/:userId', getPostsByUser);

// Protected routes
router.post(
  '/create',
  authMiddleware,
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
  ]),
  createPost
);

router.delete('/:postId', authMiddleware, deletePost);
router.post('/:postId/comment', authMiddleware, addComment);
router.post('/:postId/like', likePost);

module.exports = router;
