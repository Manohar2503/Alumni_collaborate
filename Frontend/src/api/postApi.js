import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

// ✅ Get all posts (Feed)
export const getAllPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

// ✅ Create a new post
export const createPost = async (formData) => {
  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Get only logged-in user posts
export const getMyPosts = async () => {
  const res = await API.get("/posts/my-posts");
  return res.data;
};

// ✅ Like / Unlike
export const likePost = async (postId) => {
  const res = await API.post(`/posts/${postId}/like`);
  return res.data;
};

// ✅ Add Comment
export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comment`, { text });
  return res.data;
};
