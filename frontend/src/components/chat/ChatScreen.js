import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import "./chat.css";
import { useStoreUser } from "../../utils/getStoreStates";

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState();
  const { user } = useStoreUser();

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_KEY, {
      cluster: process.env.REACT_APP_CLUSTER,
      encrypted: true,
    });
    const channel = pusher.subscribe("message");
    channel.bind("message", (data) => {
      setMsg(data);
    });
    return () => {
      pusher.unsubscribe("message");
    };
  }, []);

  useEffect(() => {
    if (msg) setChats([...chats, msg]);
  }, [msg]);
  if(user) {
	  return (
		<div className="wrapperChat">
		  <div className="containerChat">
			<ChatList chats={chats} username={user.username} />
			<ChatInput channelName={"message"} username={user.username} />
		  </div>
		</div>
	  );
  } else {
	  <></>
  }
};

export default ChatScreen;