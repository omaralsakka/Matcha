import axios from "axios";

const userUrl = "http://localhost:5000/api/users";
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
  console.log("this is config: ", config);
  const response = await axios.post(
    `${userUrl}/pictures`,
    userPictures,
    config
  );
  return response.data;
};
