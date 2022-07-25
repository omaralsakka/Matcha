import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../style/App.css";
import useField from "./useField";
import { signUp } from "../services/userServices";

const Signup = () => {
  const formTerms =
    "By confirming, you agree to our terms and conditions we will not be using your information in anyway";
  const [checked, setChecked] = useState(true);
  const email = useField("email");
  const username = useField("text");
  const fullname = useField("text");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, username, fullname, password };
    signUp(credentials).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="Auth-form-container">
      <Form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Text className="Auth-form-title">
              <h1>Sign Up</h1>
            </Form.Text>
          </Form.Group>

          {/* email input */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control {...email} />
          </Form.Group>

          {/* username input */}
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control {...username} />
          </Form.Group>

          {/* full name input */}
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Fullname</Form.Label>
            <Form.Control {...fullname} />
          </Form.Group>

          {/* password input */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control {...password} />
          </Form.Group>

          {/* form terms text */}
          <Form.Group className="mb-3" controlId="formTerms">
            <Form.Text className="text-muted">{formTerms}</Form.Text>
          </Form.Group>

          {/* tickbox for agreeing on terms */}
          <Form.Group className="mb-3" controlId="formCheckBox">
            <Form.Check
              type="checkbox"
              label="I agree on terms"
              onChange={() => setChecked(checked === true ? false : true)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={checked}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
