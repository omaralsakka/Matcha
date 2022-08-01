import UseField from "./UseField";
import { Form, Button, Container } from "react-bootstrap";
import logo from "../media/logo-black.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const email = UseField("email");
  return (
    <Container className="signup-container">
      <Form>
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
        <Button
          disabled={email.value ? false : true}
          className="form-button"
          variant="primary"
          type="submit"
        >
          Submit
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
