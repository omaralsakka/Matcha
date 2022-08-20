import axios from "axios";

const usersUrl = "http://localhost:5000/api/users";

// working on this
export const getUsersImages = async (user_id) => {
  const response = await axios.get(`${usersUrl}/pictures/${user_id}`);
  return response.data;
};

export const getUsersService = async () => {
  const response = await axios.get(`${usersUrl}/all`);
  return response.data;
};

export const getUsersProfileImage = async () => {
  const response = await axios.get(`${usersUrl}/profileimage`);
  return response.data;
};

export const likeUserService = async (usersIds) => {
  const response = await axios.post(`${usersUrl}/likeuser`, usersIds);
  return response.data;
};

export const dislikeUserService = async (usersIds) => {
  const response = await axios.post(`${usersUrl}/dislikeuser`, usersIds);
  return response.data;
};

export const viewUserService = async (usersIds) => {
  const response = await axios.post(`${usersUrl}/viewedUser`, usersIds);
  return response.data;
};

export const blockUserService = async (usersIds) => {
  const response = await axios.post(`${usersUrl}/blockuser`, usersIds);
  return response.data;
};
