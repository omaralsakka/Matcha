import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseField from "./UseField";
import logo from "../media/logo-black.png";

const Signup = () => {
  const email = UseField("email");
  const username = UseField("text");
  const firstname = UseField("text");
  const lastname = UseField("text");
  const password = UseField("password");

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
        <Button className="form-button" variant="primary" type="submit">
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
