import axios from "axios";
const baseURL = "/api/users";

export const signUp = async (credentials) => {
  const response = await axios.post(baseURL, credentials);
  console.log(`in userServices - singUp, response.data: ${response.data}`);
  return response.data;
};
