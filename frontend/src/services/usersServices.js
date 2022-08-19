import axios from "axios";

const userUrl = "http://localhost:5000/api/users";

export const getUsersImages = async (user_id) => {
  const response = await axios.get(`${userUrl}/pictures/${user_id}`);
  return response.data;
};

export const getUsersService = async () => {
  const response = await axios.get(`${userUrl}/all`);
  return response.data;
};

export const getUsersProfileImage = async () => {
  const response = await axios.get(`${userUrl}/profileimage`);
  return response.data;
};

export const likeUserService = async (usersIds) => {
  const response = await axios.post(`${userUrl}/likeuser`, usersIds);
  return response.data;
};

export const dislikeUserService = async (usersIds) => {
  const response = await axios.post(`${userUrl}/dislikeuser`, usersIds);
  return response.data;
};

export const viewUserService = async (usersIds) => {
  const response = await axios.post(`${userUrl}/viewedUser`, usersIds);
  return response.data;
};
