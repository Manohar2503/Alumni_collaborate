const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const authMiddleware = require("../MiddleWares/authMiddleware");
const { postActionLimiter } = require("../MiddleWares/rateLimiters");

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  addComment,
  editComment,
  deleteComment,
  likePost,
} = require("../controller/postController");

router.post(
  "/",
  authMiddleware,
  postActionLimiter,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createPost
);

router.get("/", authMiddleware, getAllPosts);
router.get("/my-posts", authMiddleware, getPostsByUser);
router.delete("/:postId", authMiddleware, postActionLimiter, deletePost);
router.post("/:postId/comment", authMiddleware, postActionLimiter, addComment);
router.put("/:postId/comment/:commentId", authMiddleware, postActionLimiter, editComment);
router.delete("/:postId/comment/:commentId", authMiddleware, postActionLimiter, deleteComment);
router.post("/:postId/like", authMiddleware, postActionLimiter, likePost);

module.exports = router;
