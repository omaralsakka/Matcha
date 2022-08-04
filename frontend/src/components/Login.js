import UseField from "./UseField";
import { Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../media/logo-black.png";
import { checkUserName, checkPassword } from "../utils/InputChecks";
import { loginService } from "../services/Services";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logUser } from "../reducers/loginReducer";

const Login = () => {
  const username = UseField("text");
  const password = UseField("password");
  const [loggedUser, setLoggedUser] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUser(userInfo)).then((resp) => {
      setLoggedUser(resp);
    });

    e.target.value = "";
    username.onChange(e);
    password.onChange(e);
  };
  return (
    <Container className="signup-container">
      <Form onSubmit={handleLogin}>
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
