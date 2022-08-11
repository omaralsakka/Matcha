import { Container } from "react-bootstrap";
import logo from "../media/logo-black.png";
import { useParams } from "react-router-dom";
import { verifyService } from "../services/userServices";

const Verified = () => {
  const param = useParams().code;
  const code = { code: param.substring(param.indexOf("=") + 1, param.length) };
  verifyService(code);
  return (
    <Container className="mb-3">
      <div className="mb-3 form-logo">
        <img className="form-logo-img" alt="" src={logo} />
      </div>
      <h2 className="text-center">
        Account has been verified!!
        <br />
        You can close this page now.
      </h2>
    </Container>
  );
};

export default Verified;
