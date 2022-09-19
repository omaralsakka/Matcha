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
  const response = await axios.post(`${userUrl}/verify-username-email`, type);
  return response.data;
};

export const settingsService = async (settingsObj) => {
  const response = await axios.post(`${userUrl}/settings`, settingsObj);
  return response.data;
};

export const verifyOldPassword = async (password, id) => {
  const infoObj = {
    pw: password,
    id: id,
  };
  const response = await axios.post(`${userUrl}/verify-password`, infoObj);
  return response.data;
};

export const changeEmailService = async (userObj) => {
  const response = await axios.post(`${userUrl}/change-email`, userObj);
  return response.data;
};

export const verifyEmailChangeService = async (code) => {
  const response = await axios.post(`${userUrl}/verify-change-email`, code);
  return response.data;
};

export const userNewDataService = async (newData) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${userUrl}/edit-user-data`,
    newData,
    config
  );
  return response.data;
};

export const fetchConnections = async (userId) => {
  const response = await axios.get(`${userUrl}/user-connections/${userId}`);
  return response.data;
};

export const getNotificationsService = async (userId) => {
  const response = await axios.get(`${userUrl}/get-notifications/${userId}`);
  return response.data;
};

export const getMostRecentNotificationService = async (data) => {
  const response = await axios.get(
    `${userUrl}/get-recent-notification/${data.room}/${data.time}`
  );
  return response.data;
};

export const insertNotificationService = async (notification) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${userUrl}/insert-notifications`,
    notification,
    config
  );
  return response.data;
};

export const clearNotificationsService = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${userUrl}/clear-notifications`, config);
  return response.data;
};

export const seenNotificationsService = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${userUrl}/seen-notifications`, config);
  return response.data;
};

export const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.delete(`${userUrl}/delete-user/${userId}`);
    if (response.data === "user-deleted") {
      window.localStorage.removeItem("LoggedMatchaUser");
      window.location.assign("/");
    }

    return true;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
