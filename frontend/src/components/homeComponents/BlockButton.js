import OverlayToolTip from "../../utils/OverlayToolTip";
import BlockModalPopUp from "./BlockModalPopUp ";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import blockIcon from "../../media/x-icon.png";

const BlockButton = ({ loggedUserId, user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <OverlayToolTip toolTipText="Block user">
        <Button
          onClick={handleShowModal}
          variant="light"
          className="rounded-pill action-btns"
        >
          <Image src={blockIcon} alt="block user" />
        </Button>
      </OverlayToolTip>
      <BlockModalPopUp
        show={showModal}
        setShow={setShowModal}
        loggedUser={loggedUserId}
        blockedUser={user.user_id}
      />
    </>
  );
};

export default BlockButton;
