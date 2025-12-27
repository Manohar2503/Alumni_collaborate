const Post = require("../models/postModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


const uploadToCloudinary = (file, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let media = [];

    // Images
    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(
          file,
          "alumni/images",
          "image"
        );

        media.push({
          type: "image",
          url: result.secure_url,
        });
      }
    }

    // Videos
    if (req.files?.videos) {
      for (const file of req.files.videos) {
        const result = await uploadToCloudinary(
          file,
          "alumni/videos",
          "video" // 🔥 REQUIRED
        );

        media.push({
          type: "video",
          url: result.secure_url,
        });
      }
    }

    if (!content && media.length === 0) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

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
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




// GET ALL POSTS (FEED)
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name role")
    .populate("comments.user", "name")
    .sort({ createdAt: -1 });

  const formatted = posts.map((p) => ({
    id: p._id,
    name: p.user ? p.user.name : "Unknown User",
    headline: "", // add later from profile
    role: p.user.role,
    time: p.createdAt,
    content: p.content,
    media: p.media,
    likes: p.likes.length,
    liked: p.likes.some(
      (id) => id.toString() === req.user._id.toString()
    ),
    comments: p.comments.map((c) => ({
      _id: c._id,
      userId: c.user._id,
      name: c.user ? c.user.name : "Unknown User",
      text: c.text,
      createdAt: c.createdAt,
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
//editing the comment
// EDIT COMMENT (OWNER ONLY)
const editComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // 🔐 ownership check
  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  comment.text = text;
  await post.save();

  res.json({ message: "Comment updated" });
};

// DELETE COMMENT (OWNER ONLY)
// DELETE COMMENT (OWNER ONLY)
const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // 🔐 ownership check
  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  comment.deleteOne();
  await post.save();

  res.json({ message: "Comment deleted" });
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
  editComment,    // ✅
  deleteComment,
  likePost,
};
