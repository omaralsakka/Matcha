import io from "socket.io-client";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  getNotificationsService,
  insertNotificationService,
} from "../services/usersServices";
import { useStoreNotifications } from "../utils/getStoreStates";
import { useDispatch } from "react-redux";
import { addNotification } from "../reducers/notificationReducer";

const socket = io.connect("http://localhost:5000");

const Notifications = ({ room }) => {
  const notifications = useStoreNotifications();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("join_room", room);
    const roomData = {
      room: room,
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addNotification(data));
    });
  }, [socket]);

  if (!notifications.length) {
    return (
      <DropdownButton
        id="dropdown-basic-button"
        title="Notifications"
      ></DropdownButton>
    );
  } else {
    return (
      <>
        <DropdownButton id="dropdown-basic-button" title="Notifications">
          {notifications.map((notification) => (
            <Dropdown.Item key={Math.random()}>
              {notification.notifications.message} by{" "}
              {notification.notifications.username}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </>
    );
    //   if (notificationList.length > 0) {
    //     return (
    //       <DropdownButton id="dropdown-basic-button" title="Notifications">
    //         {notificationList.map((notification) => {
    //           if (notification.notifications) {
    //             return (
    //               <Dropdown.Item key={Math.random()}>
    //                 {notification.notifications.message} by{" "}
    //                 {notification.notifications.username}
    //               </Dropdown.Item>
    //             );
    //           } else {
    //             return;
    //           }
    //         })}
    //       </DropdownButton>
    //     );
    //   } else {
    //     <></>;
    //   }
  }
};

export default Notifications;
