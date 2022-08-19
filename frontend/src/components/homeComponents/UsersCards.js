import {
  Card,
  Col,
  Row,
  Image,
  Carousel,
  Button,
  Collapse,
  Container,
  Fade,
} from "react-bootstrap";

import pic from "../../media/cp2.jpg";
import heartOutline from "../../media/heart-outline.png";
import heartInline from "../../media/heart-inline.png";
import blockIcon from "../../media/x-icon.png";
import locationIcon from "../../media/location-icon.png";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likeUser, disLikeUser } from "../../reducers/usersReducer";
import { viewUserService } from "../../services/usersServices";
import OverlayToolTip from "../../utils/OverlayToolTip";
import BlockModalPopUp from "./BlockModalPopUp ";

const UsersCards = ({ user, profilePictures, loggedUserId }) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [heart, setHeart] = useState(heartOutline);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  const [fameRate, setFameRate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.liked_by) {
      if (user.liked_by.includes(loggedUserId)) {
        setHeart(heartInline);
        setLiked(true);
      }
      setFameRate(user.liked_by.length);
    }
  }, [user, loggedUserId]);

  const displayUserInfo = () => {
    if (!open) {
      const userIds = { viewedUser: user.user_id, loggedUser: loggedUserId };
      viewUserService(userIds);
    }
    setOpen(!open);
    setHide(!hide);
  };

  const likePerson = () => {
    if (liked) {
      dispatch(disLikeUser(user.user_id, loggedUserId));
      setHeart(heartOutline);
      setFameRate(fameRate - 1);
      setLiked(false);
    } else {
      dispatch(likeUser(user.user_id, loggedUserId));
      setHeart(heartInline);
      setFameRate(fameRate + 1);
      setLiked(true);
    }
  };

  if (!user) {
    return <Spinner animation="grow" />;
  } else {
    return (
      <Col className="g-3">
        <Card className="w-auto">
          <Row>
            <Col key={user.user_id * 3}>
              <Carousel
                controls={false}
                pause="hover"
                className="carousel-cards"
              >
                <Carousel.Item>
                  <Card.Img src={pic} />
                  <Fade in={hide}>
                    <Card.ImgOverlay>
                      <Container className="card-overlay-text p-1 rounded">
                        <Card.Title className="text-white fs-1">
                          {user.fullname}
                        </Card.Title>
                      </Container>
                    </Card.ImgOverlay>
                  </Fade>
                </Carousel.Item>
              </Carousel>
              <Button
                onClick={displayUserInfo}
                aria-controls="example-collapse-text"
                className="users-cards-btn"
              >
                Check me out
              </Button>
            </Col>
            <Collapse in={open} dimension="width">
              <Col key={user.user_id * 4} md={7} id="example-collapse-text">
                <Card.Body className="cards-body h-100">
                  <div>
                    <Card.Title className="mb-3">
                      <strong className="fs-1">{user.fullname}</strong>
                      <span className="text-muted fs-3 m-3">{user.age}</span>
                    </Card.Title>
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="opacity-75 cards-icons"
                        style={{ marginRight: "10px" }}
                      >
                        <Image src={locationIcon} fluid></Image>
                      </div>
                      <Card.Text className="text-muted fs-4">
                        Lives in {user.city}
                      </Card.Text>
                    </div>
                    <Card.Text className="mb-4">
                      <strong className="fs-3">About me</strong>
                      <br />
                      <span className="fs-6 text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                        <br />
                        <span className="fs-6">@{user.username}</span>
                      </span>
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <strong className="fs-3">Interests</strong>
                    </Card.Text>
                    <Card.Text className="mb-4">
                      <span className="d-flex">
                        {user.tags.map((tag) => (
                          <span key={tag} className="cards-tags text-muted">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <strong className="fs-3">Fame Rate</strong>
                      <br />
                      <span className="text-muted fs-4">{fameRate}</span>
                    </Card.Text>
                  </div>

                  <div className="cards-buttons">
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

                    <OverlayToolTip toolTipText="Like user">
                      <Button
                        onClick={likePerson}
                        variant="light"
                        className="rounded-pill action-btns"
                      >
                        <Image src={heart} />
                      </Button>
                    </OverlayToolTip>
                  </div>
                </Card.Body>
              </Col>
            </Collapse>
          </Row>
        </Card>
      </Col>
    );
  }
};

export default UsersCards;
