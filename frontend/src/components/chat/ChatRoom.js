import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import UseField from "../UseField";
// import sendNotificationService from "../../services/notificationServices";
import "./Chat.css";
import {
  saveChatMessagesService,
  getChatMessagesService,
} from "../../services/usersServices";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ReceivedMessage, SentMessage } from "./MessageSender";
const ChatRoom = ({ socket, username, room, user_id, matchedUser }) => {
  // const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const text = UseField("text", "");
  useEffect(() => {
    const roomData = {
      room: room,
    };
    getChatMessagesService(roomData).then((resp) => {
      if (resp.messages !== null) {
        setMessageList(resp.messages.data);
      }
    });
  }, []);

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
      // sendNotificationService(matchedUser[0].email, username, 3);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  console.log(messageList);
  return (
    <Container className="col-sm-7 p-0 p-sm-2" style={{ minHeight: "80vh" }}>
      <Card className="overflow-hidden">
        <Card.Header className="fs-5">
          <strong>Chat with {matchedUser[0].username}</strong>
        </Card.Header>
        <Container className="chatbg">
          <Card.Body
            className="w-100 p-0  chatbg"
            style={{ minHeight: "60vh" }}
          >
            <ScrollToBottom>
              {messageList.map((messageContent) => {
                return (
                  <Container
                    className="d-flex"
                    key={Math.random()}
                    id={user_id === messageContent.user_id ? "you" : "other"}
                  >
                    {user_id === messageContent.user_id ? (
                      <SentMessage
                        message={messageContent.message}
                        time={messageContent.time}
                      />
                    ) : (
                      <ReceivedMessage
                        message={messageContent.message}
                        time={messageContent.time}
                      />
                    )}
                  </Container>
                );
              })}
            </ScrollToBottom>
          </Card.Body>
          <Card.Footer className=" border-top-0 bg-transparent">
            <Container className="d-flex gap-3 p-0 p-sm-3 mx-0 w-100 align-items-center flex-sm-nowrap flex-wrap">
              <Form.Control
                maxLength={300}
                as="textarea"
                {...text}
                placeholder="Hey..."
              ></Form.Control>
              <Container className="w-auto me-0">
                <Button onClick={sendMessage}>Send</Button>
              </Container>
            </Container>
          </Card.Footer>
        </Container>
      </Card>
    </Container>
  );
};

export default ChatRoom;
