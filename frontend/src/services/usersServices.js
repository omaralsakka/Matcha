import axios from "axios";

const usersUrl = "http://localhost:5000/api/users";

export const getUsersImages = async (user_id) => {
  const response = await axios.get(`${usersUrl}/user-pictures/${user_id}`);
  return response.data;
};

export const getUserProfileImage = async (user_id) => {
  const response = await axios.get(
    `${usersUrl}/user-profile-picture/${user_id}`
  );
  return response.data;
};

export const getUsersService = async (user, country) => {
  const userObj = {
    gender: user.gender,
    sexuality: user.sexuality,
    country: country,
  };
  const response = await axios.post(`${usersUrl}/all`, userObj);
  return response.data;
};

export const getUsersByCountryService = async (data) => {
  const response = await axios.post(`${usersUrl}/country`, data);
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

export const reportUserService = async (usersId) => {
  const response = await axios.post(`${usersUrl}/report-user`, usersId);
  return response.data;
};

export const getRandomUsers = async () => {
  const response = await axios.get("https://randomuser.me/api/?results=30");
  if (response.data) {
    const savedinDbResponse = await axios.post( // eslint-disable-line
      `${usersUrl}/random-users`,
      response.data
    ); 
  }
  return response.data;
};

export const getDistanceService = async (start, end) => {
  const coords = {
    start: start,
    end: end,
  };
  const response = await axios.post(`${usersUrl}/distance`, coords);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await axios.get(`${usersUrl}/user-id/${userId}`);
  return response.data;
};

export const chatService = async (matchedObj) => {
  const response = await axios.post(`${usersUrl}/chatrooms`, matchedObj);
  return response.data;
};

export const saveChatMessagesService = async (messages) => {
  const response = await axios.post(
    `${usersUrl}/insert-chat-messages`,
    messages
  );
  return response.data;
};

export const getChatMessagesService = async (roomData) => {
  const response = await axios.post(`${usersUrl}/get-chat-messages`, roomData);
  return response.data;
};

export const clearChat = async (userId1, userId2) => {
  const ids = { userId1, userId2 };
  const response = await axios.post(`${usersUrl}/clear-chat`, ids);
  return response.data;
};

export const checkUsersService = async (userId) => {
  const response = await axios.get(`${usersUrl}/check-users/${userId}`);
  return response.data;
}