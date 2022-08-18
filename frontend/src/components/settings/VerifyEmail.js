import { Container } from "react-bootstrap";
import logo from "../../media/logo-black.png";
import { useParams } from "react-router-dom";
import { verifyEmailChangeService } from "../../services/userServices"

const VerifyEmail = () => {
  const param = useParams().code;
  const code = { code: param.substring(param.indexOf("=") + 1, param.length) };
  verifyEmailChangeService(code);
  return (
    <Container className="mb-3">
      <div className="mb-3 form-logo">
        <img className="form-logo-img" alt="" src={logo} />
      </div>
      <h2 className="text-center">
        Email has been verified!!
        <br />
        You can close this page now.
      </h2>
    </Container>
  );
};

export default VerifyEmail;
