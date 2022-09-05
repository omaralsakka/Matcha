import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import sendNotificationService from "../../services/notificationServices";
import "./Chat.css"
import { saveChatMessagesService, getChatMessagesService } from "../../services/usersServices";

function ChatRoom({ socket, username, room, user_id, matchedUser }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); // getChatMessagesService(this need the roomname passed as a object or sumthin)

  useEffect(() => {
	const roomData = {
		  room: room
	}
	getChatMessagesService(roomData).then((resp) => {
		if(resp.messages !== null)
			setMessageList(resp.messages.data);
	})
  }, [])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
		user_id: user_id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
	  saveChatMessagesService(messageList)
      setCurrentMessage("");
	 //  sendNotificationService(matchedUser[0].email, username, 3);
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
                key={Math.random()} id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatRoom;