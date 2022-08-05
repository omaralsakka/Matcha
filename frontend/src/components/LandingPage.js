import { Button, Container } from "react-bootstrap";
import mobImage from "../media/cp1.jpg";
import logo from "../media/Matcha-logos_black.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container className="landing-page-content">
        <div className="image-container mx-5">
          <div className="image-div">
            <img alt="" src={mobImage} className="mobile-Img"></img>
          </div>
        </div>
        <div className="center-items">
          <div className="logo-div">
            <img alt="" src={logo} className="logo-Img"></img>
          </div>
          <Link to="/signup">
            <Button variant="dark" className="landing-signup-Button">
              Create Account
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
