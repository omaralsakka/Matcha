import axios from "axios";
const notifUrl = "http://localhost:5000/api/notification";

export const sendNotificationService = async (to, from, type) => {
	const recipents = {
		to: to,
		from: from,
		type: type
	};
	const response = await axios.post(notifUrl, recipents); 
	return response.data;
};
