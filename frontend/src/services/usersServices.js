import axios from "axios";

const userUrl = "http://localhost:5000/api/users";
let token;

export const getUsersImages = async (user_id) => {
  const response = await axios.get(`${userUrl}/pictures/${user_id}`);
  return response.data;
};
