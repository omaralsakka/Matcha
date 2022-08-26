import axios from "axios";

const usersUrl = "http://localhost:5000/api/users";

export const getUsersImages = async (user_id) => {
  const response = await axios.get(`${usersUrl}/user-pictures/${user_id}`);
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

export const getUsersProfileImage = async () => {
  const response = await axios.get(`${usersUrl}/profileimage`);
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
  const response = await axios.get("https://randomuser.me/api/?results=25");
  if (response.data) {
    const savedinDbResponse = await axios.post(
      `${usersUrl}/random-users`,
      response.data
    );
  }
  return response.data;
};

export const getDistanceService = async (start, end) => {
	const coords = {
		start: start,
		end: end
	}
	const response = await axios.post(`${usersUrl}/distance`, coords);
	return response.data;
}