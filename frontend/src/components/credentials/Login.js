import UseField from "../UseField";
import { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo-black.png";
import { checkUserName, checkPassword } from "../../utils/InputChecks";
import { useDispatch } from "react-redux";
import { logUser } from "../../reducers/loginReducer";

const Login = ({ setLoggedUser }) => {
  const username = UseField("text", "");
  const password = UseField("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUser(userInfo)).then((resp) => {
      setLoggedUser(resp);
      if (resp === false) {
        setLoginCheck(false);
      } else {
        navigate("/home");
      }
    });

    e.target.value = "";
    username.onChange(e);
    password.onChange(e);
  };
  return (
    <Container className="signup-container mt-5">
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
        {loginCheck ? (
          <></>
        ) : (
          <Form.Group className="mb-3">
            <Alert variant="danger" className="error-alert">
              Log in credentials incorrect, please try again.
            </Alert>
          </Form.Group>
        )}
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
