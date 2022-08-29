import { Button, Container, Nav, Navbar } from "react-bootstrap";
import img1 from "../media/cp1.jpg";
import img2 from "../media/cp2.jpg";
import img3 from "../media/cp3.jpg";
import img4 from "../media/cp4.jpg";
import logo from "../media/Matcha-logos_black.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const imgsArr = [img1, img2, img3, img4];
  const [cardImg, setCardImg] = useState(imgsArr[0]);
  let i = 0;

  useEffect(() => {
    setInterval(() => {
      i += 1;
      if (i > 3) {
        i = 0;
      }
      setCardImg(imgsArr[i]);
    }, 5000);
  }, []);

  return (
    <Container className="landing-page d-flex flex-column" fluid>
      <Container className="landing-page-content">
        <div className="image-container mx-5">
          <div className="image-div">
            <img alt="" src={cardImg} className="mobile-Img"></img>
          </div>
        </div>
        <div className="center-items">
          <div className="logo-div">
            <img alt="" src={logo} className="logo-Img"></img>
          </div>
          <Container className="d-flex gap-3 justify-content-center">
            <Link to="/signup">
              <Button variant="dark" className="landing-signup-Button">
                Signup
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="dark" className="landing-signup-Button">
                Login
              </Button>
            </Link>
          </Container>
        </div>
      </Container>
    </Container>
  );
};

export default LandingPage;
