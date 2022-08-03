import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UseField from "./UseField";
import logo from "../media/logo-black.png";
import { useState } from "react";
import FormCheck from "../utils/FormCheck";
import checkInputs from "../utils/InputChecks";
import { signupService } from "../services/Services";

const CheckEmail = ({ setFormSubmit }) => {
  const navigate = useNavigate();

  setTimeout(() => {
    setFormSubmit(false);
    navigate("/login");
  }, 10000);
  return (
    <>
      <div className="mb-3 form-logo">
        <img className="form-logo-img" alt="" src={logo} />
      </div>
      <h2 className="text-center">
        Please check your email to verify your account.
      </h2>
    </>
  );
};

const Signup = () => {
  const email = UseField("email");
  const username = UseField("text");
  const fullname = UseField("text");
  const password = UseField("password");
  const [consent, setConsent] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username.value,
      email: email.value,
      fullname: fullname.value,
      password: password.value,
    };

    signupService(user);
    setFormSubmit(true);
    e.target.value = "";
    email.onChange(e);
    username.onChange(e);
    fullname.onChange(e);
    password.onChange(e);
  };

  return (
    <Container className="signup-container">
      {formSubmit ? (
        <CheckEmail setFormSubmit={setFormSubmit} />
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-logo">
              <img className="form-logo-img" alt="" src={logo} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} />
              <Form.Text className="text-muted">
                Username should contain letters and numbers only with minimum
                length of 3
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control {...fullname} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} />
              <Form.Text className="text-muted">
                Password should contain at least 1 uppercase, 1 lowercase
                letter, 1 number and 1 special character. Minimum length 8.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="mb-1">
                <Form.Text className="text-muted">
                  By signing up, you agree to our Terms . Learn how we collect,
                  use and share your data in our Privacy Policy and how we use
                  cookies and similar technology in our Cookies Policy .
                </Form.Text>
              </div>
              <FormCheck consent={consent} setConsent={setConsent} />
            </Form.Group>

            <Button
              disabled={
                checkInputs(
                  username.value,
                  password.value,
                  fullname.value,
                  email.value
                ) && consent
                  ? false
                  : true
              }
              className="form-button"
              variant="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          <hr />
          <p>
            Have an account? <Link to="/login">Log In</Link>
          </p>
        </>
      )}
    </Container>
  );
};

export default Signup;
