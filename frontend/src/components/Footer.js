import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="main-footer">
        <Container></Container>
        <div className="footer-bottom mt-3">
          <p className="text-xs">
            &copy;{new Date().getFullYear} Matcha App - All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
