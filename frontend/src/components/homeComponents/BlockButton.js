import OverlayToolTip from "../../utils/OverlayToolTip";
import ModalPopUp from "./ModalPopUp";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import blockIcon from "../../media/x-icon.png";
import { blockUserService } from "../../services/usersServices";

const BlockButton = ({ loggedUserId, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const usersIds = { loggedUser: loggedUserId, blockedUser: user.user_id };
  const modalText = {
    title: "Block user",
    body: "Do you wish to block this user from seeing your account? ",
    confirm: "User has been blocked successfully",
  };

  const blockUser = async () => {
    const response = await blockUserService(usersIds);
    if (response) {
      // setShowModal(false);
      setTimeout(() => {
        window.location.assign("/home");
      }, 3000);
    }
  };

  useEffect(() => {
    if (confirm) {
      blockUser();
    }
  }, [confirm]);

  return (
    <>
      <OverlayToolTip toolTipText="Block user">
        <Button
          onClick={handleShowModal}
          variant="light"
          className="rounded-pill action-btns"
        >
          <Image src={blockIcon} alt="block user" fluid />
        </Button>
      </OverlayToolTip>
      <ModalPopUp
        show={showModal}
        setShow={setShowModal}
        setConfirm={setConfirm}
        modalText={modalText}
      />
    </>
  );
};

export default BlockButton;
