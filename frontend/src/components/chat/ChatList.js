const ChatList = ({ chats, username }) => {
	return (
	  <div className="chatsContainer">
		{chats.map((chat) => {
		  return (
			<div key={Math.random()} className={chat.username === username ? "divRight" : "divLeft"}>
			  <div
				className={
				  chat.username === username
					? " commonStyle myChatContainer "
					: "commonStyle chatContainer"
				}

			  >
				{chat.username !== username && (
				  <div className="msgAuthor">{chat.username}</div>
				)}
				<div>{chat.message}</div>
			  </div>
  
			  <div
				className={
				  chat.username === username
					? "arrowRight arrow"
					: "arrowLeft arrow"
				}
			  ></div>
			</div>
		  );
		})}
	  </div>
	);
  };
  
  export default ChatList;