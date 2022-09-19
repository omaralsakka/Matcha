import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../reducers/loginReducer";
import { useEffect, useState } from "react";
import MatchesCanvas from "./MatchesCanvas";
import UpdateStatus from "../utils/updateUserStatus";
import { getConnections } from "../reducers/connectionsReducer";
import { useStoreUser, useStoreUsers } from "../utils/getStoreStates";
import Notifications from "./Notifications";
import { fetchNotifications } from "../reducers/notificationReducer";
import ScrollTop from "../utils/scrollTop";
import {checkUsers} from "../reducers/usersReducer"

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const {users} = useStoreUsers();

  const [showCanvas, setShowCanvas] = useState(false);
  const handleShowCanvas = () => setShowCanvas(true);

  UpdateStatus(loggedUser);
  ScrollTop("navigation");
  useEffect(() => {
    if (user) {
      const notificationInterval = setInterval(() => {
        dispatch(fetchNotifications(user.user_id));
      }, 4000);

      const interval = setInterval(() => {
        dispatch(getConnections(user.user_id));
      }, 2000);
      return () => clearInterval(interval, notificationInterval);
    }
  }, [user]); // eslint-disable-line

  useEffect(() => {
    if (users.length){
      // dispatch(checkUsers(users))
      const checkUsersInterval = setInterval(() => {
        dispatch(checkUsers(users));
      }, 2000)
      return () => clearInterval(checkUsersInterval);
    }
  }, [users, dispatch])
  const handleLogOut = () => {
    try {
      const status = JSON.stringify({
        status: "offline",
        userId: loggedUser.id,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
      dispatch(logoutUser());
      setLoggedUser(false);
    } catch (error) {
      console.error("logout error: ", error.message);
    }
  };

  return (
    <>
      <Navbar
        id="navigation"
        collapseOnSelect
        bg="transparent"
        variant="light"
        expand="sm"
      >
        <Container fluid>
          <Navbar.Brand href="/home">Matcha</Navbar.Brand>
          <Nav.Item className="d-md-none ms-auto me-2">
            <Notifications room={loggedUser.id} />
          </Nav.Item>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center w-100">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="#">
                <Nav.Link onClick={handleShowCanvas}>Matches</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/history">
                <Nav.Link>History</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <Nav.Item className="ms-md-auto d-none d-md-block">
                <Notifications room={loggedUser.id} />
              </Nav.Item>
              <Nav.Item className="mx-3 d-none d-md-block">
                <Navbar.Text className="fs-5">
                  {loggedUser.username}
                </Navbar.Text>
              </Nav.Item>
              <Button
                onClick={handleLogOut}
                className="landing-signup-Button "
                size="sm"
                variant="dark"
              >
                Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <MatchesCanvas showCanvas={showCanvas} setShowCanvas={setShowCanvas} />
    </>
  );
};

export default Navigation;
