import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../style/App.css";

const Signup = () => {
  const formTerms =
    "By confirming, you agree to our terms and conditions we will not be using your information in anyway";
  const [checked, setChecked] = useState(true);

  return (
    <div className="Auth-form-container">
      <Form className="Auth-form">
        <div className="Auth-form-content">
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Text className="Auth-form-title">
              <h1>Sign Up</h1>
            </Form.Text>
          </Form.Group>
          {/* email input */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" />
          </Form.Group>

          {/* username input */}
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          {/* full name input */}
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          {/* password input */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
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
