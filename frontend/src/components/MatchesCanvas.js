import { Offcanvas, Container, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useStoreConnections, useStoreUser } from "../utils/getStoreStates";
import { unMatchUser } from "../reducers/connectionsReducer";
import ModalPopUp from "./homeComponents/ModalPopUp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../utils/ProfileImage";

const MatchesCanvas = ({ showCanvas, setShowCanvas }) => {
  const users = useStoreConnections();
  const handleCloseCanvas = () => setShowCanvas(false);
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const navigate = useNavigate();
  const handleChat = (id) => {
    navigate(`/chat/${id}`);
    setShowCanvas(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [unMatchedId, setUnMatchedId] = useState("");
  const [modalText, setModalText] = useState({});
  const handleShowModal = (id, fullname) => {
    setModalText({
      title: `Unmatch user`,
      body: `Do you wish to unmatch ${fullname}? `,
      confirm: "User unmatched successfully",
    });
    setShowModal(true);
    setUnMatchedId(id);
  };

  useEffect(() => {
    if (confirm) {
      dispatch(unMatchUser(unMatchedId, user.user_id));
    }
  }, [confirm, dispatch]); // eslint-disable-line
  if (!users) {
    return <Spinner />;
  } else {
    return (
      <>
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
                      <Container className="w-50 overflow-hidden">
                        <ProfileImage
                          userGender={user.gender}
                          userId={user.user_id}
                        />
                      </Container>
                      <Container>{user.fullname}</Container>
                      <Container className="d-flex gap-3">
                        <Button
                          onClick={() =>
                            handleChat(user.user_id, user.username)
                          }
                          variant="outline-dark"
                          size="sm"
                        >
                          chat
                        </Button>
                        <Button
                          onClick={() =>
                            handleShowModal(user.user_id, user.fullname)
                          }
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
        <ModalPopUp
          show={showModal}
          setShow={setShowModal}
          setConfirm={setConfirm}
          modalText={modalText}
        />
      </>
    );
  }
};

export default MatchesCanvas;
