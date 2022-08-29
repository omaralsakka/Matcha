import { Offcanvas, Container, Button, Spinner } from "react-bootstrap";
import { useStoreConnections } from "../utils/getStoreStates";
import { useNavigate } from "react-router-dom";

const MatchesCanvas = ({ showCanvas, setShowCanvas }) => {
  const users = useStoreConnections();
  const handleCloseCanvas = () => setShowCanvas(false);
  const navigate = useNavigate();

  const handleChat = (id, username) => {
	navigate("/chat");
  }

  if (!users) {
    return <Spinner />;
  } else {
    return (
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Container className="mb-3 bg-light border-bottom px-0">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Matches</Offcanvas.Title>
          </Offcanvas.Header>
        </Container>
        <Offcanvas.Body>
          {users.map((user) => {
            return (
              <Container className="px-0" key={user.user_id}>
                <Container
                  className="d-flex px-0 align-items-center mb-3"
                  fluid
                >
                  <Container>{user.fullname}</Container>
                  <Container className="d-flex gap-3">
                    <Button onClick={() => handleChat(user.user_id, user.username)} variant="outline-dark" size="sm">
                      chat
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      unmatch
                    </Button>
                  </Container>
                </Container>
                <hr />
              </Container>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
};

export default MatchesCanvas;
