import { Modal, Button } from "react-bootstrap";
import { blockUserService } from "../../services/usersServices";

const BlockModalPopUp = ({ show, setShow, loggedUser, blockedUser }) => {
  const handleClose = () => setShow(false);
  const usersIds = { loggedUser, blockedUser };

  const blockUser = () => {
    console.log("userIds: ", usersIds);
    blockUserService(usersIds).then((resp) => console.log(resp));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Block user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to block this user?
          <br />
          After blocking this user you will not be able to see this profile
          again
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={blockUser}>
            Block user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlockModalPopUp;
