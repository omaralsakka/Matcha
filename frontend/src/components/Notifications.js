import io from "socket.io-client";
import { useEffect, useState, forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useStoreNotifications } from "../utils/getStoreStates";
import { useDispatch } from "react-redux";
import {
  addNotification,
  clearNotifications,
} from "../reducers/notificationReducer";
import { Container, Image, Button } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import bell from "../media/bell.png";

const socket = io.connect("http://localhost:5000");

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <Button
    className=" border-0 shadow-none p-1 bg-transparent"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

const Notifications = ({ room }) => {
  const notifications = useStoreNotifications();
  const dispatch = useDispatch();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    socket.emit("join_room", room);
  }, []); // eslint-disable-line

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addNotification(data));
    });
  }, [socket]); // eslint-disable-line

  const handleClearNotification = () => {
    if (!seen) {
      setSeen(true);
    } else {
      setSeen(false);
      if (notifications.notifications.length) {
        dispatch(clearNotifications());
      }
    }
  };

  if (!notifications.notifications.length) {
    return (
      <Dropdown align={"end"} onToggle={handleClearNotification}>
        <DropdownToggle
          as={CustomToggle}
          variant="light"
          className="rounded-pill bg-transparent"
        >
          <Image src={bell} style={{ maxWidth: "25px" }} />
        </DropdownToggle>
        <DropdownMenu flip>
          <Container className="text-center">
            <span className="fs-6">No new notifications</span>
          </Container>
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    return (
      <Container className="d-flex p-0">
        <Container className="p-0">
          <span className="fs-6 text-danger">{notifications.amount}</span>
        </Container>
        <Dropdown align={"end"} onToggle={handleClearNotification}>
          <DropdownToggle
            as={CustomToggle}
            variant="light"
            className="rounded-pill bg-transparent"
          >
            <Image src={bell} style={{ maxWidth: "25px" }} />
          </DropdownToggle>
          <DropdownMenu flip>
            {notifications.notifications.map((notification) => (
              <Container key={Math.random()}>
                <Dropdown.Item>
                  <span className="text-wrap d-md-none">
                    {notification.notifications.message}{" "}
                    <b>{notification.notifications.username}</b>
                  </span>
                  <span className="d-sm-block d-none">
                    {notification.notifications.message}{" "}
                    {notification.notifications.username}
                  </span>
                </Dropdown.Item>
                <hr />
              </Container>
            ))}
          </DropdownMenu>
        </Dropdown>
      </Container>
    );
  }
};

export default Notifications;
