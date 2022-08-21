import { Modal, Button } from "react-bootstrap";
import ModalMessage from "./ModalMessage";
import { useState } from "react";
const ModalPopUp = ({ show, setShow, setConfirm, modalText }) => {
  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    setShowMessage(true);
    setShow(false);
    setConfirm(true);
  };
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalText.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalMessage
        modalText={modalText}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
    </>
  );
};

export default ModalPopUp;
