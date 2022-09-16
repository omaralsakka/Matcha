import UseField from "../UseField";
import logo from "../../media/logo-black.png";
import { useParams, Link } from "react-router-dom";
import { checkPassword } from "../../utils/InputChecks";
import { resetPassWordService } from "../../services/userServices";
import { Form, Button, Container } from "react-bootstrap";
import AlertInput from "../../utils/AlertInput";
import ScrollTop from "../../utils/scrollTop";

const ResetPassword = () => {
  const password = UseField("text", "");
  const param = useParams().code;
  const code = { code: param.substring(param.indexOf("=") + 1, param.length) };

  ScrollTop("resetPass");
  const handleSubmit = (e) => {
    e.preventDefault();

    const info = {
      code: code,
      password: password.value,
    };
    resetPassWordService(info);
    e.target.value = "";
    password.onChange(e);
    window.location.assign("/login");
  };

  return (
    <Container id="resetPass" className="signup-container">
      <Form.Group className="mb-3 form-logo">
        <Link to="/">
          <img className="form-logo-img" alt="" src={logo} />
        </Link>
      </Form.Group>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>New password</Form.Label>
          <Form.Control {...password} type="password" />
          <Form.Text className="mb-3">
            Password should contain at least 1 uppercase, 1 lowercase letter, 1
            number and 1 special character. Minimum length 8.
          </Form.Text>
          {checkPassword(password.value) || password.value.length === 0 ? (
            <></>
          ) : (
            <AlertInput variant="danger" text="invalid password!" />
          )}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <hr />
    </Container>
  );
};

export default ResetPassword;
