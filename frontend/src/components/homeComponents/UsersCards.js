import {
  Card,
  Col,
  Row,
  Image,
  Carousel,
  Button,
  Collapse,
  Accordion,
  Container,
  Fade,
} from "react-bootstrap";

import pic from "../../media/cp2.jpg";
import pic2 from "../../media/cp3.jpg";
import heartOutline from "../../media/heart-outline.png";
import blockIcon from "../../media/x-icon.png";
import locationIcon from "../../media/location-icon.png";
import { useState } from "react";

const UsersCards = ({ user, profilePictures }) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);

  const displayUserInfo = () => {
    setOpen(!open);
    setHide(!hide);
  };
  return (
    <Col className="g-3">
      <Card className="w-auto">
        <Row>
          <Col>
            <Carousel controls={false} pause="hover" className="carousel-cards">
              <Carousel.Item>
                <Card.Img src={pic} />
                <Fade in={hide}>
                  <Card.ImgOverlay>
                    <Container className="card-overlay-text p-1 w-100 rounded-pill">
                      <Card.Title className="text-white fs-1" fluid>
                        {user.fullname}
                      </Card.Title>
                    </Container>
                  </Card.ImgOverlay>
                </Fade>
              </Carousel.Item>
              {/* <Carousel.Item>
                <Card.Img src={pic2} />
                <Card.ImgOverlay className="mt-5">
                  <Card.Title>{user.fullname}</Card.Title>
                </Card.ImgOverlay>
              </Carousel.Item> */}
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
            <Col md={7} id="example-collapse-text">
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
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
          </Collapse>
        </Row>
      </Card>
    </Col>
  );
  //   <Col className="g-3">
  //   <Card className="w-auto">
  //     <Row>
  //       <Col>
  //         <Carousel controls={false} pause="hover" className="carousel-cards">
  //           <Carousel.Item>
  //             <Card.Img src={pic} />
  //           </Carousel.Item>
  //           <Carousel.Item>
  //             <Card.Img src={pic2} />
  //           </Carousel.Item>
  //         </Carousel>
  //         <Button
  //           onClick={displayUserInfo}
  //           aria-controls="example-collapse-text"
  //           aria-expanded={open}
  //           className="users-cards-btn"
  //         >
  //           Check me out
  //         </Button>
  //       </Col>
  //       <Collapse in={open} dimension="width">
  //         <Col md={7} id="example-collapse-text">
  //           <Card.Body className="cards-body h-100">
  //             <div>
  //               <Card.Title className="mb-3">
  //                 <strong className="fs-1">{user.fullname}</strong>
  //                 <span className="text-muted fs-3 m-3">{user.age}</span>
  //               </Card.Title>
  //               <div className="d-flex align-items-center mb-3" fluid>
  //                 <div
  //                   className="opacity-75 cards-icons"
  //                   style={{ marginRight: "10px" }}
  //                 >
  //                   <Image src={locationIcon} fluid></Image>
  //                 </div>
  //                 <Card.Text className="text-muted fs-4">
  //                   Lives in {user.city}
  //                 </Card.Text>
  //               </div>
  //               <Card.Text className="mb-4">
  //                 <div>
  //                   <strong className="fs-3">About me</strong>
  //                 </div>
  //                 <br />
  //                 <p className="fs-6 text-muted">
  //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  //                   sed do eiusmod tempor incididunt ut labore et dolore magna
  //                   aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  //                   ullamco laboris nisi ut aliquip ex ea commodo consequat.
  //                   Duis aute irure dolor in reprehenderit in voluptate velit
  //                   esse cillum dolore eu fugiat nulla pariatur. Excepteur
  //                   sint occaecat cupidatat non proident, sunt in culpa qui
  //                   officia deserunt mollit anim id est laborum.
  //                   <br />
  //                   <span className="fs-6">@{user.username}</span>
  //                 </p>
  //               </Card.Text>
  //               <hr />
  //               <Card.Text>
  //                 <div>
  //                   <strong className="fs-3">Interests</strong>
  //                 </div>
  //                 <br />
  //                 <div className="d-flex">
  //                   {user.tags.map((tag) => (
  //                     <p className="cards-tags text-muted">{tag}</p>
  //                   ))}
  //                 </div>
  //               </Card.Text>
  //             </div>
  //             <div className="cards-buttons">
  //               <Button variant="light" className="rounded-pill">
  //                 <Image src={blockIcon} />
  //               </Button>
  //               <Button variant="light" className="rounded-pill">
  //                 <Image src={heartOutline} />
  //               </Button>
  //             </div>
  //           </Card.Body>
  //         </Col>
  //       </Collapse>
  //     </Row>
  //   </Card>
  // </Col>
};

export default UsersCards;
