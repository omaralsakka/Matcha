import { Button, Modal, Form, Container } from "react-bootstrap";
import AlertInput from "../../utils/AlertInput";
import { checkPassword } from "../../utils/InputChecks";
import { deleteUserAccount } from "../../services/userServices";
import { verifyOldPassword } from "../../services/userServices";
import UseField from "../UseField";
import { useState } from "react";

const DeleteAccount = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const deletePassword = UseField("password", "");
  const [modalAlert, setModalAlert] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setModalAlert(false);
  };
  const handleShow = () => setShowModal(true);

  const handleDeleteAccount = () => {
    verifyOldPassword(deletePassword.value, userId).then((res) => {
      if (res) {
        if (res === "incorrect") {
          setModalAlert(true);
        } else {
          setModalAlert(false);
          deleteUserAccount(userId);
        }
      }
    });
  };

  return (
    <>
      <Container className="p-0 px-1">
        <Button variant="danger" onClick={handleShow}>
          Delete Account
        </Button>
        <p className="text-muted fs-6 mt-2">
          This action is irreversible, all your data will be removed
        </p>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? <br />
          <Container className="mt-3 px-0">
            <Form.Text>Please enter your password to confirm</Form.Text>
            <Form.Control {...deletePassword} />
          </Container>
          {modalAlert && (
            <AlertInput variant="danger" text="Invalid password!" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={checkPassword(deletePassword.value) ? false : true}
            variant="danger"
            onClick={handleDeleteAccount}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
