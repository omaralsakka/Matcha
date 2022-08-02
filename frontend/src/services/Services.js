import axios from "axios";
// const userUrl = "/api/users";
const userUrl = "http://localhost:5000/api/users";

export const signupService = async (userInfo) => {
  const response = await axios.post(userUrl, userInfo);
  return response.data;
};
