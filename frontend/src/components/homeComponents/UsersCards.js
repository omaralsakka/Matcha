import {
  Card,
  Col,
  Row,
  Image,
  Badge,
  Carousel,
  CarouselItem,
  Button,
} from "react-bootstrap";

import pic from "../../media/cp2.jpg";
import pic2 from "../../media/cp3.jpg";
import heartOutline from "../../media/heart-outline.png";
import blockIcon from "../../media/x-icon.png";
import locationIcon from "../../media/location-icon.png";
const UsersCards = ({ user, profilePictures }) => {
  return (
    <Col className="g-3">
      <Card>
        <Row>
          <Col>
            <Carousel controls={false} pause="hover">
              <Carousel.Item>
                <Card.Img src={pic} />
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img src={pic2} />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={7}>
            <Card.Body className="cards-body h-100">
              <div>
                <Card.Title className="mb-3">
                  <strong className="fs-1">{user.fullname}</strong>
                  <span className="text-muted fs-3 m-3">{user.age}</span>
                </Card.Title>
                <div className="d-flex align-items-center mb-3" fluid>
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
                  <div>
                    <strong className="fs-3">About me</strong>
                  </div>
                  <br />
                  <p className="fs-6 text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    <br />
                    <span className="fs-6">@{user.username}</span>
                  </p>
                </Card.Text>
                <hr />
                <Card.Text>
                  <div>
                    <strong className="fs-3">Interests</strong>
                  </div>
                  <br />
                  <div className="d-flex">
                    {user.tags.map((tag) => (
                      <p className="cards-tags text-muted">{tag}</p>
                    ))}
                  </div>
                </Card.Text>
              </div>
              <div className="cards-buttons">
                <Button variant="light" className="rounded-pill">
                  <Image src={blockIcon} />
                </Button>
                <Button variant="light" className="rounded-pill">
                  <Image src={heartOutline} />
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default UsersCards;
