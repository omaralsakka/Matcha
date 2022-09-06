import io from "socket.io-client";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getNotificationsService, insertNotificationService } from "../services/usersServices";
const socket = io.connect("http://localhost:5000");

const Notifications = ({room}) => {
	const [notificationList, setNotificationList] = useState([]);

	useEffect(() => {
			socket.emit("join_room", room);
			const roomData = {
				room: room
			}
			getNotificationsService(roomData).then((resp) => {
				console.log('resp: ', resp)
			if(resp.notifications !== null) {
				console.log('setting')
				setNotificationList(resp);
			}
		  })
	}, []);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			let newList = [...notificationList];
			newList.push(data);
			setNotificationList(newList);
			insertNotificationService(data);
		});
	  }, [socket]);

	if(notificationList.length > 0) {
		return (
			<DropdownButton id="dropdown-basic-button" title="Notifications">
			  {notificationList.map((notification) => {
				  if (notification.notifications){
					  return (<Dropdown.Item key={Math.random()} >{notification.notifications.message} by {notification.notifications.username}</Dropdown.Item>)
				  } else {
					  return
				  }
				})
			}
			</DropdownButton>
		  );
	} else {
		<></>
	};
}

export default Notifications;