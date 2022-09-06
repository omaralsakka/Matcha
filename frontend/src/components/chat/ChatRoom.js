import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import UseField from "../UseField"
import "./Chat.css"
import { saveChatMessagesService, getChatMessagesService } from "../../services/usersServices";

function ChatRoom({ socket, username, room, user_id, matchedUser }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const text = UseField('text', "");

  useEffect(() => {
	const roomData = {
		  room: room
	}
	getChatMessagesService(roomData).then((resp) => {
		if(resp.messages !== null) {
			setMessageList(resp.messages.data);
		}
	})
  }, [])

  const sendMessage = async (e) => {
    if (text.value !== "") {
      const messageData = {
        room: room,
		user_id: user_id,
        message: text.value,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
	  let newList = messageList;
	  newList.push(messageData);
	  saveChatMessagesService(newList);
	  e.target.value = ""; 
	  text.onChange(e);
    }
};

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                key={Math.random()} id={user_id === messageContent.user_id ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
         /*  type="text" */
          /* value={currentMessage} */
          placeholder="Hey..."
/*           onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }} */
		  {...text}
        />
        <button onClick={(e) => sendMessage(e)}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatRoom;