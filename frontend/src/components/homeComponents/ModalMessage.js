import { Modal } from "react-bootstrap";

const ModalMessage = ({ modalText, setShowMessage, showMessage }) => {
  const handleClose = () => setShowMessage(false);

  return (
    <>
      <>
        <Modal show={showMessage} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalText.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalText.confirm}</Modal.Body>
        </Modal>
      </>
    </>
  );
};

export default ModalMessage;
