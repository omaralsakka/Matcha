import OverlayToolTip from "../../utils/OverlayToolTip";
import { Button, Image } from "react-bootstrap";
import heartOutline from "../../media/heart-outline.png";
import heartInline from "../../media/heart-inline.png";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { disLikeUser, likeUser } from "../../reducers/usersReducer";

const LikeButton = ({
  loggedUserId,
  user,
  fameRate,
  setFameRate,
  loggedUsername,
}) => {
  const [heart, setHeart] = useState(heartOutline);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const likePerson = async () => {
    if (liked) {
      dispatch(disLikeUser(user.user_id, loggedUserId, loggedUsername));
      setHeart(heartOutline);
      setFameRate(fameRate - 1);
      setLiked(false);
    } else {
      dispatch(likeUser(user.user_id, loggedUserId, loggedUsername, user.username));
      setHeart(heartInline);
      setFameRate(fameRate + 1);
      setLiked(true);
    }
  };

  useEffect(() => {
    if (user.liked_by) {
      if (user.liked_by.includes(loggedUserId)) {
        setHeart(heartInline);
        setLiked(true);
      } else {
        setHeart(heartOutline);
        setLiked(false);
      }
      setFameRate(user.liked_by.length);
    }
  }, [user, loggedUserId, user.liked_by, setFameRate]);

  return (
    <>
      <OverlayToolTip toolTipText="Like user">
        <Button
          onClick={likePerson}
          variant="light"
          className="rounded-pill action-btns"
        >
          <Image src={heart} fluid />
        </Button>
      </OverlayToolTip>
    </>
  );
};

export default LikeButton;
