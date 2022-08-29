import { Offcanvas, Container, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useStoreConnections, useStoreUser } from "../utils/getStoreStates";
import { unMatchUser } from "../reducers/connectionsReducer";

const MatchesCanvas = ({ showCanvas, setShowCanvas }) => {
  const users = useStoreConnections();
  const handleCloseCanvas = () => setShowCanvas(false);
  const dispatch = useDispatch();
  const { user } = useStoreUser();

  const handleUnmatch = (id) => {
    dispatch(unMatchUser(id, user.user_id)).then((resp) => console.log(resp));
  };

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
          {users.length ? (
            users.map((user) => {
              return (
                <Container className="px-0" key={user.user_id}>
                  <Container
                    className="d-flex px-0 align-items-center mb-3"
                    fluid
                  >
                    <Container>{user.fullname}</Container>
                    <Container className="d-flex gap-3">
                      <Button variant="outline-dark" size="sm">
                        chat
                      </Button>
                      <Button
                        onClick={() => handleUnmatch(user.user_id)}
                        variant="outline-danger"
                        size="sm"
                      >
                        unmatch
                      </Button>
                    </Container>
                  </Container>
                  <hr />
                </Container>
              );
            })
          ) : (
            <Container className="fs-4 text-center mt-5">
              No matches found yet!
            </Container>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
};

export default MatchesCanvas;
