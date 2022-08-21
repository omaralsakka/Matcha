import { Button } from "react-bootstrap";
import ModalPopUp from "./ModalPopUp";
import { useState, useEffect } from "react";
import { reportUserService } from "../../services/usersServices";
const ReportAccount = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const modalText = {
    title: "Report user",
    body: "Do you wish to report this user ?",
    confirm: "Report sent successfully",
  };
  const reportUser = async () => {
    const response = await reportUserService({ userId });
    if (response) {
      setTimeout(() => {
        window.location.assign("/home");
      }, 2000);
    }
  };

  useEffect(() => {
    if (confirm) {
      reportUser();
    }
  }, [confirm]);

  return (
    <>
      <Button
        onClick={handleShowModal}
        variant="danger"
        className="w-25 mx-auto border-0 bg-transparent text-danger rounded"
      >
        Report account
      </Button>
      <ModalPopUp
        show={showModal}
        setShow={setShowModal}
        setConfirm={setConfirm}
        modalText={modalText}
      />
    </>
  );
};

export default ReportAccount;
