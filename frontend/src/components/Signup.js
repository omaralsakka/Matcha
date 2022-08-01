import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseField from "./UseField";
import logo from "../media/logo-black.png";
import { useState } from "react";
import FormCheck from "../utils/FormCheck";

const Signup = () => {
  const email = UseField("email");
  const username = UseField("text");
  const firstname = UseField("text");
  const lastname = UseField("text");
  const password = UseField("password");
  const [consent, setConsent] = useState(true);

  return (
    <Container className="signup-container">
      <Form>
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control {...firstname} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control {...lastname} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} />
          <Form.Text className="text-muted">
            Password should contain at least 1 uppercase, 1 lowercase letter, 1
            number and 1 special character
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="mb-1">
            <Form.Text className="text-muted">
              By signing up, you agree to our Terms . Learn how we collect, use
              and share your data in our Privacy Policy and how we use cookies
              and similar technology in our Cookies Policy .
            </Form.Text>
          </div>
          <FormCheck consent={consent} setConsent={setConsent} />
        </Form.Group>

        <Button
          disabled={consent}
          className="form-button"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
      <hr />
      <p>
        Have an account? <Link to="/login">Log In</Link>
      </p>
    </Container>
  );
};

export default Signup;
