const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    // Build media array from uploaded files
    let media = [];

    if (req.files?.images) {
      req.files.images.forEach((file) => {
        media.push({
          type: "image",
          url: `/uploads/images/${file.filename}`,
        });
      });
    }

    if (req.files?.videos) {
      req.files.videos.forEach((file) => {
        media.push({
          type: "video",
          url: `/uploads/videos/${file.filename}`,
        });
      });
    }

    // Validation (IMPORTANT)
    if (!content && media.length === 0) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    // Create post
    const post = await Post.create({
      user: req.user._id,
      content,
      media,
    });

    const populatedPost = await post.populate("user", "name");

    res.status(201).json({
      message: "Post created successfully",
      data: populatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost };


// GET ALL POSTS (FEED)
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name")
    .populate("comments.user", "name")
    .sort({ createdAt: -1 });

  const formatted = posts.map((p) => ({
    id: p._id,
    name: p.user.name,
    headline: "", // add later from profile
    time: p.createdAt,
    content: p.content,
    media: p.media,
    likes: p.likes.length,
    liked: p.likes.some(
      (id) => id.toString() === req.user._id.toString()
    ),
    comments: p.comments.map((c, i) => ({
      id: i,
      name: c.user.name,
      text: c.text,
    })),
  }));

  res.json(formatted);
};

// GET POSTS BY USER
const getPostsByUser = async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json(posts);
};

// DELETE POST (OWNER ONLY)
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};

// ADD COMMENT
const addComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.comments.push({
    user: req.user._id,
    text: req.body.text,
  });

  await post.save();
  res.json({ message: "Comment added" });
};

// LIKE / UNLIKE
const likePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const userId = req.user._id;

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  res.json({ likes: post.likes.length });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  addComment,
  likePost,
};
