import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreUser, useStoreMatch } from "../../utils/getStoreStates";
import { chatService } from "../../services/usersServices";
import ChatRoom from "./ChatRoom";
import { Container } from "react-bootstrap";

const socket = io.connect("http://localhost:5000"); // connecting to backend

const Chat = () => {
  const param = parseInt(useParams().id, 10);
  const { user } = useStoreUser();
  const matchedUser = useStoreMatch(param);
  const [roomStatus, setRoomStatus] = useState(false);
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    if (user && matchedUser && roomStatus === false) {
      const matchedObj = {
        user_id: user.user_id,
        username: user.username,
        match_user_id: matchedUser[0].user_id,
        match_username: matchedUser[0].username,
      };
      const joinRoom = (roomName) => {
        socket.emit("join_room", roomName.room_name);
        return true;
      };
      chatService(matchedObj).then((resp) => {
        setRoomName(resp.room_name);
        setRoomStatus(joinRoom(resp));
      });
    }
  }, [user, matchedUser]);

  if (roomStatus === false) {
    return (
      <Container>
        <h2>lets get this chat thing going</h2>
      </Container>
    );
  } else {
    return (
      <Container className="min-vh-100 mt-5 p-0">
        <ChatRoom
          socket={socket}
          username={user.username}
          user_id={user.user_id}
          room={roomName}
          matchedUser={matchedUser}
        />
      </Container>
    );
  }
};

export default Chat;
