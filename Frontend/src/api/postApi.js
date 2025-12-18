import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true, // cookie auth
});

export const getAllPosts = () => API.get("/posts/all");

export const createPost = (formData) =>
  API.post("/posts/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const likePost = (postId) =>
  API.post(`/posts/${postId}/like`);

export const addComment = (postId, text) =>
  API.post(`/posts/${postId}/comment`, { text });
