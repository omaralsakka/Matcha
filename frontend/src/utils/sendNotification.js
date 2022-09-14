import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
  const sendNotification = async (room, username, message) => {

	const notificationData = {
		room: room,
		username: username,
		message: message,
		time:
		  new Date(Date.now()).getHours() +
		  ":" +
		  new Date(Date.now()).getMinutes() +
		  ":" +
		  new Date(Date.now()).getSeconds(),
	  };
	  await socket.emit("send_message", notificationData);
  }

  export default sendNotification;
