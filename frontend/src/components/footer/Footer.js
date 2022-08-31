import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const AppFooter = () => {
  return (
    <Container
      className="bg-dark text-white d-flex w-100 justify-content-sm-between flex-column flex-sm-row align-items-center"
      fluid
    >
      <Container className="d-flex p-0 mt-3 justify-content-center justify-content-sm-start">
        <Link to="/terms" className="terms-link mx-1">
          <p className="fs-6">Terms</p>
        </Link>
        <Link to="/about" className="terms-link mx-1">
          <p className="fs-6">About us</p>
        </Link>
      </Container>
      <Container className="d-flex mt-sm-3 justify-content-sm-end justify-content-center">
        <p className="fs-6">&copy; 2022 Matcha App - All Rights Reserved</p>
      </Container>
    </Container>
  );
};

export default AppFooter;
