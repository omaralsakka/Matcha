import UseField from "./UseField";
import { Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../media/logo-black.png";
import { checkUserName, checkPassword } from "../utils/InputChecks";

const Login = () => {
  const username = UseField("text");
  const password = UseField("password");

  return (
    <Container className="signup-container">
      <Form>
        <Form.Group className="mb-3 form-logo">
          <img className="form-logo-img" alt="" src={logo} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} />
        </Form.Group>

        <Button
          disabled={
            checkUserName(username.value) && checkPassword(password.value)
              ? false
              : true
          }
          className="form-button mb-3"
          variant="primary"
          type="submit"
        >
          Log In
        </Button>
      </Form>
      <div className="forgot-password text-center">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <hr />
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Container>
  );
};

export default Login;
