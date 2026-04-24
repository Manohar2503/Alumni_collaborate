import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

const extractPosts = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export const getAllPosts = async () => {
  const res = await API.get("/posts");
  return extractPosts(res.data);
};

export const createPost = async (formData) => {
  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyPosts = async () => {
  const res = await API.get("/posts/my-posts");
  return extractPosts(res.data);
};

export const likePost = async (postId) => {
  const res = await API.post(`/posts/${postId}/like`);
  return res.data;
};

export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comment`, { text });
  return res.data;
};
