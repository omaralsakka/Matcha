import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { useStoreUser } from "../utils/getStoreStates";
import LoadingScreen from "./LoadingScreen";
import PicturesForm from "./userInfoForms/PicturesForm";
import { useState, useEffect } from "react";
import { getUsersImages } from "../services/usersServices";
import EditTags from "./profileComponents/EditTags";
import locationIcon from "../media/location-icon.png";
import EditBio from "./profileComponents/EditBio";
import EditTogglable from "./profileComponents/EditTogglable";

const Profile = () => {
  const { user } = useStoreUser();
  const [userPictures, setUserPictures] = useState([]);

  useEffect(() => {
    if (user) {
      getUsersImages(user.user_id).then((resp) => {
        setUserPictures(resp);
      });
    }
  }, [user]);
  if (!user || !userPictures.length) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5">
        <h1>@{user.username}</h1>
        <hr />
        <Card className="mb-3 mx-auto w-100">
          <Row className="no-gutters mb-3 mw-100">
            <Col md={4}>
              <Card.Img src={userPictures[0].picture} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title className="fs-1">
                  {user.fullname}
                  <span className="mx-3 fs-3 text-muted">{user.age}</span>
                </Card.Title>
                <Card.Text className="text-muted fs-4 d-flex mb-4">
                  <span className="opacity-75 cards-icons me-2">
                    <Image src={locationIcon} fluid></Image>
                  </span>
                  Lives in {user.city}
                </Card.Text>

                <Card.Title className="fs-3">
                  <strong>About me</strong>
                </Card.Title>
                <Card.Text className="mb-3">{user.bio}</Card.Text>
                <Card.Text className="mb-3 text-muted">
                  @{user.username}
                </Card.Text>
                <EditBio />
                <hr />
                <Card.Title className="fs-3 mb-3">
                  <strong>Interests</strong>
                </Card.Title>
                <Card.Text className="mb-4">
                  <span className="d-flex">
                    {user.tags.map((tag) => (
                      <span key={tag} className="cards-tags text-muted">
                        {tag}
                      </span>
                    ))}
                  </span>
                </Card.Text>
                <EditTags userTags={user.tags} />
              </Card.Body>
            </Col>
          </Row>
          <Row className="mx-1 mb-3">
            <Col>
              <EditTogglable buttonText="Edit pictures">
                <PicturesForm defaultValue={userPictures} />
              </EditTogglable>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
};

export default Profile;
