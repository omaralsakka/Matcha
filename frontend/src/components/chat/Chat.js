import io from "socket.io-client";
const socket = io.connect("http://localhost:5000"); // connecting to backend

const Chat = () => {

	const joinRoom = () => {
		socket.emit("join_room", "test"); // room (second paramaeter) will be the chat rooms name aka user1-user2
	}

	return (
		<div>
			<h2>lets get this chat thing going</h2>
			<button onClick={() => joinRoom()}> JOIN</button>
		</div>
	)
}

export default Chat;