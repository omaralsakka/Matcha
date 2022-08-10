import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer";

const Navigation = ({ loggedUser, setLoggedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      dispatch(logoutUser());
      setLoggedUser(false);
      navigate("/login");
    } catch (error) {
      console.error("logout error: ", error.message);
    }
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="#home">Matcha</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/home">Home</Nav.Link>
          </Nav>
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
    </>
  );
};

export default Navigation;
