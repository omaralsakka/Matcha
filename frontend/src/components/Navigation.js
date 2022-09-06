import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer";
import { useEffect, useState } from "react";
import MatchesCanvas from "./MatchesCanvas";
import UpdateStatus from "../utils/updateUserStatus";
import { getConnections } from "../reducers/connectionsReducer";
import { useStoreUser } from "../utils/getStoreStates";
import Notifications from "./Notifications";

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useStoreUser();

  const [showCanvas, setShowCanvas] = useState(false);
  const handleShowCanvas = () => setShowCanvas(true);

  UpdateStatus(loggedUser);

  useEffect(() => {
    if (user) {
      dispatch(getConnections());
    }
  }, [user]);

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
      navigate("/login");
    } catch (error) {
      console.error("logout error: ", error.message);
    }
  };

  return (
    <>
      <Navbar bg="transparent" variant="light" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/home">Matcha</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center w-100">
              <Link to="/home" className="nav-link">
                Home
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <Nav.Link onClick={handleShowCanvas}>Matches</Nav.Link>
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
			  <Notifications room={loggedUser.id}/>
              <Nav.Item className="mx-3 ms-md-auto d-none d-md-block">
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
