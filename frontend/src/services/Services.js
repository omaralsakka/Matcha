import axios from "axios";

const userUrl = "http://localhost:5000/api/users";
let token;

export const setToken = (userToken) => {
  token = userToken;
};

export const signupService = async (userInfo) => {
  const response = await axios.post(userUrl, userInfo);
  return response.data;
};

export const verifyService = async (verificationCode) => {
  const response = await axios.post(`${userUrl}/verify`, verificationCode);
  return response.data;
};

export const loginService = async (userInfo) => {
  const response = await axios.post(`${userUrl}/login`, userInfo);
  return response.data;
};
