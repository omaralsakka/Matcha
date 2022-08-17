import axios from "axios";

const userUrl = "http://localhost:5000/api/user";
let token;

export const setServiceToken = (userToken) => {
  token = `bearer ${userToken}`;
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

export const tokenLoginService = async (userInfo) => {
  const response = await axios.post(`${userUrl}/login/tk`, userInfo);
  return response.data;
};

export const forgotPassWordService = async (userInfo) => {
  const response = await axios.post(`${userUrl}/forgotpassword`, userInfo);
  return response.data;
};

export const resetPassWordService = async (userInfo) => {
  const response = await axios.post(`${userUrl}/resetpassword`, userInfo);
  return response.data;
};

export const infoFormService = async (userInfo) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${userUrl}/info`, userInfo, config);
  return response.data;
};

export const pictureFormService = async (userPictures) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${userUrl}/pictures`,
    userPictures,
    config
  );
  return response.data;
};

export const InfoFilledTokenService = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${userUrl}/infoFilledToken`, {}, config);
  return response.data;
};

export const getCredentials = async (type) => {
  const response = await axios.post(`${userUrl}/logins`, type);
  return response.data;
};

export const getSearch = async (user_id) => {
  const response = await axios.get(`${userUrl}/settings/:id`, user_id);
  return response.data;
};

export const updateSearch = async (data) => {
  const response = await axios.post(`${userUrl}/settings-update`, data);
  return response.data;
};
