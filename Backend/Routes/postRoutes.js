const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const authMiddleware = require("../MiddleWares/authMiddleware");

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  addComment,
  likePost,
} = require("../controller/postController");
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createPost
);

router.get("/", authMiddleware, getAllPosts);
router.get("/user/:userId", authMiddleware, getPostsByUser);
router.delete("/:postId", authMiddleware, deletePost);
router.post("/:postId/comment", authMiddleware, addComment);
router.post("/:postId/like", authMiddleware, likePost);

module.exports = router;
