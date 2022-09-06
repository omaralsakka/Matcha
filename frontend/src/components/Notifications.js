import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useStoreNotifications } from "../utils/getStoreStates";
import { useDispatch } from "react-redux";
import {
  addNotification,
  clearNotifications,
} from "../reducers/notificationReducer";
import { Container, Image } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const socket = io.connect("http://localhost:5000");

const useOutsideAlerter = (ref, notifications) => {
  const dispatch = useDispatch();
  console.log(notifications);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (notifications.length) {
          console.log("here");
          dispatch(clearNotifications());
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const Notifications = ({ room }) => {
  const wrapperRef = useRef(null);
  const notifications = useStoreNotifications();
  const dispatch = useDispatch();
  const [seen, setSeen] = useState(false);

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

  const handleClearNotification = () => {
    if (!seen) {
      setSeen(true);
    } else {
      setSeen(false);
      if (notifications.length) {
        dispatch(clearNotifications());
      }
    }
  };

  if (!notifications.length) {
    return (
      <Dropdown align={"end"} onToggle={handleClearNotification}>
        <DropdownToggle variant="light" className="rounded-pill bg-transparent">
          <Image />
        </DropdownToggle>
        <DropdownMenu>
          <Container className="text-center">
            <span className="fs-6">No new notifications</span>
          </Container>
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    return (
      <>
        <Dropdown align={"end"} onToggle={handleClearNotification}>
          <DropdownToggle
            variant="light"
            className="rounded-pill bg-transparent"
          >
            <Image />
          </DropdownToggle>
          <DropdownMenu>
            {notifications.map((notification) => (
              <Dropdown.Item key={Math.random()}>
                {notification.notifications.message} by{" "}
                {notification.notifications.username}
              </Dropdown.Item>
            ))}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }
};

export default Notifications;
