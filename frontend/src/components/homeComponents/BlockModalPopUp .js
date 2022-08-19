import { Modal, Button } from "react-bootstrap";

const BlockModalPopUp = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
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
          <Button variant="danger" onClick={handleClose}>
            Block user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlockModalPopUp;
