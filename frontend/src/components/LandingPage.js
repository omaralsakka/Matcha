import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import img1 from "../media/cp1.jpg";
import img2 from "../media/cp2.jpg";
import img3 from "../media/cp3.jpg";
import img4 from "../media/cp4.jpg";
import logo from "../media/Matcha-logos_black.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollTop from "../utils/scrollTop";

const LandingPage = () => {
  const imgsArr = [img1, img2, img3, img4];
  const [cardImg, setCardImg] = useState(imgsArr[0]);
  let i = 0;

  ScrollTop("landing");

  useEffect(() => {
    setInterval(() => {
      i += 1; // eslint-disable-line
      if (i > 3) {
        i = 0;
      }
      setCardImg(imgsArr[i]);
    }, 5000);
  }, []);

  return (
    <Container id="landing" className="bg-transparent" fluid>
      <Container className="d-flex vh-100 align-items-center">
        <Container>
          <Card className="bg-transparent border-0">
            <Row className="d-flex align-items-center">
              <Col md={5} className="p-3">
                <Container className="p-0 w-75 landing-page-box-shadow rounded">
                  <Card.Img src={cardImg} className="w-100" />
                </Container>
              </Col>
              <Col md={5}>
                <Row sm={2}>
                  <Container className="w-75">
                    <Image src={logo} fluid />
                  </Container>
                </Row>
                <Row sm={2}>
                  <Container className=" w-100 text-center mb-5">
                    <span className="fs-2">
                      Find your <span className="text-danger">love</span> match
                    </span>
                  </Container>
                </Row>
                <Row sm={2}>
                  <Container className="d-flex gap-4 justify-content-center ">
                    <Link to="/signup">
                      <Button variant="outline-dark">Signup</Button>
                    </Link>

                    <Link to="/login">
                      <Button variant="outline-dark">Login</Button>
                    </Link>
                  </Container>
                </Row>
              </Col>
            </Row>
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

export default LandingPage;
