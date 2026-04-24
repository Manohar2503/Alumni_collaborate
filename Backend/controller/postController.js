const Post = require("../models/postModel");
const Profile = require("../models/profileModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { getPagination } = require("../utils/pagination");

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

    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file, "alumni/images", "image");
        media.push({ type: "image", url: result.secure_url });
      }
    }

    if (req.files?.videos) {
      for (const file of req.files.videos) {
        const result = await uploadToCloudinary(file, "alumni/videos", "video");
        media.push({ type: "video", url: result.secure_url });
      }
    }

    if (!content && media.length === 0) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const profile = await Profile.findOne({ userId: req.user._id });

    const post = await Post.create({
      user: req.user._id,
      content,
      media,
      author: {
        name: profile?.name || req.user.name,
        profileImage: profile?.profileImage || "",
        headline: profile?.headline || "",
        role: req.user.role,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const posts = await Post.find()
      .populate("user", "name role")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const formatted = posts.map((p) => ({
      _id: p._id,
      author: {
        name: p.author?.name || p.user?.name || "User",
        profileImage: p.author?.profileImage || "",
        headline: p.author?.headline || "",
        role: p.author?.role || p.user?.role || "",
      },
      time: p.createdAt,
      content: p.content,
      media: p.media,
      likes: p.likes.length,
      liked: p.likes.some((id) => id.toString() === req.user._id.toString()),
      comments: p.comments.map((c) => ({
        _id: c._id,
        userId: c.user?._id,
        name: c.user?.name || "User",
        text: c.text,
        createdAt: c.createdAt,
      })),
    }));

    res.json({
      page,
      limit,
      data: formatted,
    });
  } catch (error) {
    console.error("getAllPosts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const myPosts = await Post.find({ user: req.user._id })
      .populate("user", "name role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const formatted = myPosts.map((p) => ({
      _id: p._id,
      author: {
        name: p.author?.name || p.user?.name || "User",
        profileImage: p.author?.profileImage || "",
        headline: p.author?.headline || "",
        role: p.author?.role || p.user?.role || "",
      },
      time: p.createdAt,
      content: p.content,
      media: p.media,
      likes: p.likes.length,
      liked: p.likes.some((id) => id.toString() === req.user._id.toString()),
      comments: p.comments || [],
    }));

    res.status(200).json({
      page,
      limit,
      data: formatted,
    });
  } catch (err) {
    console.error("getPostsByUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  comment.text = text;
  await post.save();

  res.json({ message: "Comment updated" });
};

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

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  comment.deleteOne();
  await post.save();

  res.json({ message: "Comment deleted" });
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);

  if (!postId || postId === "undefined") {
    return res.status(400).json({ message: "Invalid Post ID" });
  }

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
  editComment,
  deleteComment,
  likePost,
};
