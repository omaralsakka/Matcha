import axios from "axios";
const notifUrl = "http://localhost:5000/api/notification";

export const sendNotificationService = async (to, from, type) => {
  const recipents = {
    to: to,
    from: from,
    type: type,
  };
  // I HAVE MUTED THIS FOR THE ERROR
  // const response = await axios.post(notifUrl, recipents);
  // return response.data
  return;
};
