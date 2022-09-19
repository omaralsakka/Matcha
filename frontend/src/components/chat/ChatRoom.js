import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import UseField from "../UseField";
import sendNotification from "../../utils/sendNotification";
import "./Chat.css";
import {
  saveChatMessagesService,
  getChatMessagesService,
} from "../../services/usersServices";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ReceivedMessage, SentMessage } from "./MessageSender";
import ProfileImage from "../../utils/ProfileImage";

const ChatRoom = ({ socket, username, room, user_id, matchedUser }) => {
  const [messageList, setMessageList] = useState([]);
  const text = UseField("text", "");

  useEffect(() => {
    if (!matchedUser.length) {
      window.location.assign("/home");
    }
  }, [matchedUser]);

  useEffect(() => {
    const roomData = {
      room: room,
    };
    getChatMessagesService(roomData).then((resp) => {
      if (resp.messages !== null) {
        setMessageList(resp.messages.data);
      }
    });
  }, []); // eslint-disable-line

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
      sendNotification(
        matchedUser[0].user_id,
        username,
        "A message was sent to you by"
      );
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  if (!matchedUser.length) {
    return <></>;
  } else {
    return (
      <Container
        className="col-lg-7 col-sm-12 p-0 p-sm-2"
        style={{ minHeight: "80vh" }}
      >
        <Card className="overflow-hidden">
          <Card.Header className="fs-5 d-flex align-items-center">
            <Container
              className="col-md-1 col-sm-2 col-2 m-0 me-1 d-flex align-items-center rounded overflow-hidden"
              style={{ minWidth: "60px" }}
            >
              <ProfileImage
                userGender={matchedUser[0].gender}
                userId={matchedUser[0].user_id}
              />
            </Container>
            <strong>@ {matchedUser[0].username}</strong>
          </Card.Header>
          <Container className="chatbg">
            <Card.Body
              className="w-100 p-0 chatbg"
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
                          userGender={matchedUser[0].gender}
                          userId={messageContent.user_id}
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
  }
};

export default ChatRoom;
