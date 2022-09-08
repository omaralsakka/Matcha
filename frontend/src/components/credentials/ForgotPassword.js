import UseField from "../UseField";
import { useState, useEffect } from "react";
import {
  getCredentials,
  forgotPassWordService,
} from "../../services/userServices";
import { Form, Button, Container } from "react-bootstrap";
import logo from "../../media/logo-black.png";
import { Link } from "react-router-dom";
import { checkEmail } from "../../utils/InputChecks";
import AlertInput from "../../utils/AlertInput";
import ScrollTop from "../../utils/scrollTop";

const ForgotPassword = () => {
  const email = UseField("email", "");
  const [emailVerify, setEmailVerify] = useState(true);

  ScrollTop("forgotPass");
  useEffect(() => {
    getCredentials({ type: "email" }).then((res) => {
      let obj = res.find((o) => o.email === email.value);
      setEmailVerify(true);
      if (obj) {
        if (obj.email === email.value) {
          setEmailVerify(false);
        }
      }
    });
  }, [email.value]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email.value,
    };

    forgotPassWordService(user);
    e.target.value = "";
    email.onChange(e);
  };

  return (
    <Container id="forgotPass" className="mb-3 shadow rounded p-sm-4 col-sm-6">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-logo">
          <Link to="/">
            <img className="form-logo-img" alt="" src={logo} />
          </Link>
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="mb-3">
            <Form.Text className="text-muted">
              Enter your email and we'll send you a link to get back into your
              account.
            </Form.Text>
          </div>
          <Form.Control {...email} placeholder="Enter email" />
        </Form.Group>
        {emailVerify === false || email.value.length === 0 ? (
          <></>
        ) : (
          <AlertInput variant="danger" text="This email does not exist" />
        )}
        <Button
          disabled={checkEmail(email.value) ? false : true}
          className="form-button"
          variant="primary"
          type="submit"
        >
          Send
        </Button>
      </Form>
      <hr />
      <Container className="p-1">
        <p>
          Back To Login? <Link to="/login">Log In</Link>
        </p>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
