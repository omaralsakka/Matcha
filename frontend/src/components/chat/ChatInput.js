import { useState } from "react";
import axios from "axios";

const ChatInput = ({ channelName, username }) => {
  const [message, setMessage] = useState("");
  const [showErr, setShowErr] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      let data = {
        username,
        message,
      };
      setShowErr(false);
      axios
        .post(`http://localhost:5000/message?channel=${channelName}`, data)
        .then(() => {
          setMessage("");
        });
    } else setShowErr(true);
  };

  return (
    <form className="inputContainerChat" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        className="inputElement"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="inputBtn" type="submit">
        Send
      </button>
      {showErr && <div className="errorText">Enter your message</div>}
    </form>
  );
};

export default ChatInput;