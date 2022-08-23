import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UseField from "../UseField";
import logo from "../../media/logo-black.png";
import { useState, useEffect } from "react";
import FormCheck from "../../utils/FormCheck";
import checkInputs from "../../utils/InputChecks";
import {
  checkUserName,
  checkEmail,
  checkPassword,
} from "../../utils/InputChecks";
import { signupService, getCredentials } from "../../services/userServices";
import ageConvertion from "../../utils/ageConvertion";

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
  const email = UseField("email", "");
  const username = UseField("text", "");
  const fullname = UseField("text", "");
  const password = UseField("password", "");
  const age = UseField("date", "");
  const [passType, setPassType] = useState("password");
  const [consent, setConsent] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [userVerify, setUsernameVerify] = useState(1);
  const [emailVerify, setEmailVerify] = useState(1);

  useEffect(() => {
    getCredentials({ type: "username" }).then((res) => {
      let obj = res.find((o) => o.username === username.value);
      setUsernameVerify(1);
      if (obj) {
        if (obj.username === username.value) {
          setUsernameVerify(0);
        }
      }
    });
    getCredentials({ type: "email" }).then((res) => {
      let obj = res.find((o) => o.email === email.value);
      setEmailVerify(1);
      if (obj) {
        if (obj.email === email.value) {
          setEmailVerify(0);
        }
      }
    });
  }, [username.value, email.value]);

  /*  useEffect(() => {
    getCredentials({ type: "email" }).then((res) => {
      let obj = res.find((o) => o.email === email.value);
      setEmailVerify(1);
      if (obj) {
        if (obj.email === email.value) {
          setEmailVerify(0);
        }
      }
    });
  }, [email.value]); */

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username.value,
      email: email.value,
      fullname: fullname.value,
      password: password.value,
      age: ageConvertion(age.value),
    };

    signupService(user);
    setFormSubmit(true);
    e.target.value = "";
    email.onChange(e);
    username.onChange(e);
    fullname.onChange(e);
    password.onChange(e);
    age.onChange(e);
  };

  return (
    <Container className="signup-container mb-3 mt-3">
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
              {checkEmail(email.value) || email.value.length === 0 ? (
                <></>
              ) : (
                <Alert variant="danger" className="error-alert mt-4">
                  <strong>Email</strong> invalid!
                </Alert>
              )}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              {emailVerify === 0 ? (
                <Alert variant="danger" className="error-alert mt-4">
                  This <strong>email</strong> is already in use! Please choose
                  an other one.
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} />
              {checkUserName(username.value) || username.value.length === 0 ? (
                <></>
              ) : (
                <Alert variant="danger" className="error-alert mt-4">
                  <strong>Username</strong> invalid!
                </Alert>
              )}
              <Form.Text className="text-muted">
                Username should contain letters and numbers only with minimum
                length of 3
              </Form.Text>
              {userVerify === 0 ? (
                <Alert variant="danger" className="error-alert mt-4">
                  This <strong>username</strong> is already in use! Please
                  choose an other one.
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control {...fullname} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control {...age} />
              <Form.Text className="text-muted">
                Age limit is 18 years old.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} type={passType} />
              {checkPassword(password.value) || password.value.length === 0 ? (
                <></>
              ) : (
                <Alert variant="danger" className="username-alert mt-4">
                  <strong>Password</strong> invalid!
                </Alert>
              )}
              <Form.Text className="text-muted">
                Password should contain at least 1 uppercase, 1 lowercase
                letter, 1 number and 1 special character. Minimum length 8.
              </Form.Text>
              <Form.Check
                type="checkbox"
                label="show password"
                onClick={() =>
                  passType === "password"
                    ? setPassType("text")
                    : setPassType("password")
                }
              />
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
                  email.value,
                  age.value
                ) &&
                consent &&
                userVerify &&
                emailVerify
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
