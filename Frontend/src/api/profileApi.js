import axios from "./axiosInstance";

export const getMyProfile = async () => {
  const res = await axios.get("/profile/me");
  return res.data;
};

export const updateProfile = async (formData) => {
  const res = await axios.put("/profile", formData);
  return res.data.profile;
};


