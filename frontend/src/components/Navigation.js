import { Navbar, Nav, Container, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import Notifications from "./Notifications";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer";
import { useState } from "react";
import MatchesCanvas from "./MatchesCanvas";

import getDate from "../utils/getDate";

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCanvas, setShowCanvas] = useState(false);
  const handleShowCanvas = () => setShowCanvas(true);

  // to check if user left the browser, will be set as offline
  const time = getDate();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const status = JSON.stringify({
        status: "online",
        userId: loggedUser.id,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
    } else {
      const status = JSON.stringify({
        status: "offline",
        userId: loggedUser.id,
        time,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
    }
  });

  // once user opens the browser, will be set as active
  useEffect(() => {
    if (loggedUser) {
      const status = JSON.stringify({
        status: "online",
        userId: loggedUser.id,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
    }
  }, [loggedUser]);

  const handleLogOut = () => {
    try {
      const status = JSON.stringify({
        status: "offline",
        userId: loggedUser.id,
        time,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
      dispatch(logoutUser());
      setLoggedUser(false);
      navigate("/login");
    } catch (error) {
      console.error("logout error: ", error.message);
    }
  };

  return (
    <>
      <Navbar bg="transparent" variant="light">
        <Container fluid>
          <Navbar.Brand href="#home">Matcha</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
            <Nav.Link onClick={handleShowCanvas}>Matches</Nav.Link>
          </Nav>
          {/*  <Notifications /> */}{" "}
          {/* turned off for now, makes the app slower */}
          <Navbar.Collapse className="justify-content-end">
            <Nav.Item className="mx-3">
              <Navbar.Text className="fs-5">{loggedUser.username}</Navbar.Text>
            </Nav.Item>
            <Button
              onClick={handleLogOut}
              className="landing-signup-Button"
              variant="dark"
            >
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <MatchesCanvas showCanvas={showCanvas} setShowCanvas={setShowCanvas} />
    </>
  );
};

export default Navigation;
