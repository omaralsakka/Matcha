import axios from "axios";
const userUrl = "/api/users";

export const signupService = async (userInfo) => {
  const response = await axios.post(userUrl, userInfo);
  // console.log("this is response.data:", response.data);
  // return response.data;
};
