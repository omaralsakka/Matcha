import OverlayToolTip from "../../utils/OverlayToolTip";
import ModalPopUp from "./ModalPopUp";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import blockIcon from "../../media/x-icon.png";
import { blockUser } from "../../reducers/usersReducer";
import { useDispatch } from "react-redux";

const BlockButton = ({ loggedUserId, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleShowModal = () => setShowModal(true);
  const modalText = {
    title: "Block user",
    body: "Do you wish to block this user from seeing your account? ",
    confirm: "User has been blocked successfully",
  };

  useEffect(() => {
    if (confirm) {
      dispatch(blockUser(loggedUserId, user.user_id));
    }
  }, [confirm]); // eslint-disable-line

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
