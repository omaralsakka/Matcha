import {
  Card,
  Col,
  Row,
  Button,
  Container,
  Fade,
  Image,
} from "react-bootstrap";
import locationIcon from "../../media/location-icon.png";
import { updateUsersStatus } from "../../reducers/usersReducer";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import UsersImagesCarousel from "./UsersImagesCarousel";
import FadeIn from "react-fade-in";
import {
  viewUserService,
  getDistanceService,
} from "../../services/usersServices";
import BlockButton from "./BlockButton";
import LikeButton from "./LikeButton";
import ReportAccount from "./ReportAccount";
import { getUsersImages } from "../../services/usersServices";
import UserCardInfo from "./UserCardInfo";
import onlineIcon from "../../media/online.png";
import sendNotification from "../../utils/sendNotification";
import { useDispatch } from "react-redux";
import convertTZ from "../../utils/ConvertTZ";


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
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open){
      dispatch(updateUsersStatus(user.user_id))
    }
  }, [open]) // eslint-disable-line

  const [displayEffect, setDisplayEffect] = useState({
    picCol: 12,
    bodyDisplay: "d-none",
    cardClass: "w-50 overflow-hidden",
    bottomRow: "mb-5 mt-3",
    status: "d-none",
  });
  const last_logged_time = user.last_logged_time.split("T");
  const time = last_logged_time[1].split(".");
  const convertedDate = convertTZ(`${last_logged_time[0]} ${time[0]} +${time[1]}`, "Europe/Helsinki") 
  const fullTime = `${convertedDate.getHours()}:${convertedDate.getMinutes()}`
  const displayUserInfo = () => {
    if (!open) {
      const userIds = { viewedUser: user.user_id, loggedUser: loggedUserId };
      viewUserService(userIds);

      getDistanceService(loggedUserCoords, user.coordinates).then((resp) => {
        if (resp < 1 && resp > 0) {
          setDistance(parseInt(resp * 1000) + " m");
        } else {
          setDistance(resp + " km");
        }
      });
      setDisplayEffect({
        picCol: 4,
        bodyDisplay: "",
        cardClass: "w-100 overflow-hidden",
        bottomRow: "d-none",
        status: "d-flex align-items-center gap-2 mt-3",
      });
      setFadeBody({ transitionDuration: "2000" });
      sendNotification(
        user.user_id,
        loggedUsername,
        "Your profile was viewed by"
      );
    } else {
      setFadeBody({ visible: "" });
      setTimeout(() => {
        setDisplayEffect({
          picCol: 12,
          bodyDisplay: "d-none",
          cardClass: "w-50 overflow-hidden",
          bottomRow: "mb-5 mt-3",
          status: "d-none",
        });
      }, [450]);
    }

    setOpen(!open);
    setHide(!hide);
  };

  useEffect(() => {
    getUsersImages(user.user_id).then((resp) => setUserImages(resp));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (userImages.length) {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [userImages]);

  if (!userImages.length) {
    return (
      <Col className="g-3 d-flex justify-content-center">
        <Spinner animation="grow" />
      </Col>
    );
  } else {
    return (
      <Col className="g-3 d-flex justify-content-center">
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <Card
            className={displayEffect.cardClass}
            style={{ minWidth: "23rem" }}
          >
            <Row className="no-gutters w-auto">
              <Col md={displayEffect.picCol}>
                <UsersImagesCarousel
                  userImages={userImages}
                  userGender={user.gender}
                />
                <Container className={displayEffect.status}>
                  {user.status === "online" ? (
                    <>
                      <Container className="px-0 mx-0 cards-icons">
                        <Image src={onlineIcon} fluid />
                      </Container>
                      <span className="fs-6 text-muted">Online</span>
                    </>
                  ) : (
                    <>
                      <span className="fs-7 text-muted">
                        Last login time: {last_logged_time[0]} {fullTime}
                      </span>
                    </>
                  )}
                </Container>
              </Col>

              <Col md={8} className={displayEffect.bodyDisplay}>
                <Card.Body className="h-100">
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
                <Container className={displayEffect.bottomButton}>
                  <Button
                    variant="outline-dark"
                    onClick={displayUserInfo}
                    aria-expanded={open}
                  >
                    Check me out
                  </Button>
                </Container>
              </Col>
            </Row>
          </Card>
        )}
      </Col>
    );
  }
};

export default UsersCards;
