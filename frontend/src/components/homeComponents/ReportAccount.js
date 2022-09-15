import { Button, Container } from "react-bootstrap";
import ModalPopUp from "./ModalPopUp";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reportUser } from "../../reducers/usersReducer";

const ReportAccount = ({ loggedUserId, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const dispatch = useDispatch();

  const modalText = {
    title: "Report user",
    body: "Do you wish to report this user ?",
    confirm: "Report sent successfully",
  };
  const report = () => {
    if (!user.reports_by.includes(loggedUserId)) {
      dispatch(reportUser(loggedUserId, user.user_id)).then((response) => {
        if (response) {
          setTimeout(() => {
            setConfirm(false);
          }, 3000);
        }
      });
    }
  };

  useEffect(() => {
    if (confirm) {
      report();
    }
  }, [confirm]); // eslint-disable-line

  return (
    <Container className="d-flex justify-center mt-3 w-100">
      <Button
        onClick={handleShowModal}
        variant="danger"
        className="w-75 mx-auto border-0 bg-transparent text-danger rounded"
      >
        Report account
      </Button>
      <ModalPopUp
        show={showModal}
        setShow={setShowModal}
        setConfirm={setConfirm}
        modalText={modalText}
      />
    </Container>
  );
};

export default ReportAccount;
