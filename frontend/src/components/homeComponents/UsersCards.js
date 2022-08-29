import {
  Card,
  Col,
  Row,
  Button,
  Collapse,
  Container,
  Fade,
  Image,
} from "react-bootstrap";
import locationIcon from "../../media/location-icon.png";

import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import UsersImagesCarousel from "./UsersImagesCarousel";
import FadeIn from "react-fade-in";
import {
  viewUserService,
  getDistanceService,
} from "../../services/usersServices";
import { sendNotificationService } from "../../services/notificationServices";
import BlockButton from "./BlockButton";
import LikeButton from "./LikeButton";
import ReportAccount from "./ReportAccount";
import { getUsersImages } from "../../services/usersServices";
import UserCardInfo from "./UserCardInfo";

// ------ FIX HERE --------------

const UsersCards = ({
  user,
  loggedUserId,
  loggedUsername,
  loggedUserCoords,
}) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [userImages, setUserImages] = useState([]);
  const [fameRate, setFameRate] = useState(0);
  const [distance, setDistance] = useState("");
  const [fadeBody, setFadeBody] = useState({ visible: "" });

  const [displayEffect, setDisplayEffect] = useState({
    picCol: 12,
    bodyDisplay: "d-none",
    cardClass: "w-50 overflow-hidden",
    bottomRow: "mb-5 mt-3",
  });

  const displayUserInfo = () => {
    if (!open) {
      const userIds = { viewedUser: user.user_id, loggedUser: loggedUserId };
      viewUserService(userIds);
      sendNotificationService(user.email, loggedUsername, 2);
      getDistanceService(loggedUserCoords, user.coordinates).then((resp) => {
        setDistance(resp);
      });
      setDisplayEffect({
        picCol: 4,
        bodyDisplay: "",
        cardClass: "w-100 overflow-hidden",
        bottomRow: "d-none",
      });
      setFadeBody({ transitionDuration: "2000" });
    } else {
      setFadeBody({ visible: "" });
      setTimeout(() => {
        setDisplayEffect({
          picCol: 12,
          bodyDisplay: "d-none",
          cardClass: "w-50 overflow-hidden",
          bottomRow: "mb-5 mt-3",
        });
      }, [450]);
    }

    setOpen(!open);
    setHide(!hide);
  };

  useEffect(() => {
    getUsersImages(user.user_id).then((resp) => setUserImages(resp));
  }, []);

  if (!userImages.length) {
    return <Spinner animation="grow" />;
  } else {

    return (
      <Col className="g-3 d-flex justify-content-center">
        <Card className={displayEffect.cardClass} style={{ minWidth: "23rem" }}>
          <Row className="no-gutters w-auto">
            <Col md={displayEffect.picCol}>
              <UsersImagesCarousel
                userImages={userImages}
                userGender={user.gender}
              />
            </Col>
            <Collapse in={open} dimension="height">
              <Col md={8} className={displayEffect.bodyDisplay}>
                <Card.Body>
                  <FadeIn {...fadeBody}>
                    <UserCardInfo user={user} distance={distance} />
                    <Container className="d-flex justify-content-center gap-5 mt-5">
                      <BlockButton loggedUserId={loggedUserId} user={user} />
                      <LikeButton
                        loggedUserId={loggedUserId}
                        user={user}
                        fameRate={fameRate}
                        setFameRate={setFameRate}
                        loggedUsername={loggedUsername}
                      />
                    </Container>
                    <ReportAccount loggedUserId={loggedUserId} user={user} />
                  </FadeIn>
                </Card.Body>
              </Col>
            </Collapse>
          </Row>

          <Row>
            <Col className="p-3 mx-3">
              <Container className={displayEffect.bottomRow}>
                <Fade in={hide}>
                  <Card.Title className="fs-1">
                    <strong>{user.fullname}</strong>
                    <span className="mx-3 fs-3 text-muted">{user.age}</span>
                  </Card.Title>
                </Fade>
                <Fade in={hide}>
                  <Container className="d-flex align-items-center gap-2 px-0">
                    <span className="opacity-75 cards-icons">
                      <Image src={locationIcon} fluid />
                    </span>
                    <Card.Text className="text-muted fs-5">
                      Lives in {user.city}
                    </Card.Text>
                  </Container>
                </Fade>
              </Container>
              <Container>
                <Button
                  variant="outline-dark"
                  onClick={displayUserInfo}
                  // aria-controls="collapse-col"
                  aria-expanded={open}
                >
                  Check me out
                </Button>
              </Container>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
};

export default UsersCards;
