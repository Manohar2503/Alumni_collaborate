import axios from "axios";
import { extractCollection } from "./responseUtils";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

export const getAllPosts = async () => {
  const res = await API.get("/posts");
  return extractCollection(res.data);
};

export const createPost = async (formData) => {
  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyPosts = async () => {
  const res = await API.get("/posts/my-posts");
  return extractCollection(res.data);
};

export const likePost = async (postId) => {
  const res = await API.post(`/posts/${postId}/like`);
  return res.data;
};

export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comment`, { text });
  return res.data;
};
