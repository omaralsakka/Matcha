import UseField from "../UseField";
import { useState, useEffect } from "react";
import {
  getCredentials,
  forgotPassWordService,
} from "../../services/userServices";
import { Form, Button, Container, Alert } from "react-bootstrap";
import logo from "../../media/logo-black.png";
import { Link } from "react-router-dom";
import { checkEmail } from "../../utils/InputChecks";

const ForgotPassword = () => {
  const email = UseField("email", "");
  const [emailVerify, setEmailVerify] = useState(true);

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
    <Container className="signup-container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-logo">
          <img className="form-logo-img" alt="" src={logo} />
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
          <Alert variant="danger">
            This <strong>email</strong> does not exist, please try again.
          </Alert>
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
      <div className="text-center">
        <p>
          Back To Login? <Link to="/login">Log In</Link>
        </p>
      </div>
    </Container>
  );
};

export default ForgotPassword;
