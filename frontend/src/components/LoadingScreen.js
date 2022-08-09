import { Container } from "react-bootstrap";
import logo from "../media/Matcha-logos_black.png";

const LoadingScreen = () => (
  <Container className="loading-container">
    <div className="center-loading-logo">
      <img alt="" src={logo} />
    </div>
  </Container>
);

export default LoadingScreen;
