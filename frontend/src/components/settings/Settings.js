import UseField from "../UseField";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useStoreUser } from "../../utils/getStoreStates";
import LoadingScreen from "../LoadingScreen";

const Settings = () => {
  const { user } = useStoreUser();
  const username = UseField("text");
  const fullname = UseField("text");
  const email = UseField("email");
  const oldPassword = UseField("password");
  const newPassword = UseField("password");
  const [passType, setPassType] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!user) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5 mb-3 w-50 ">
        <h1>Settings</h1>
        <hr />
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Change username</Form.Label>
            <Form.Control {...username} placeholder={user.username} />
            <Form.Text className="text-muted">
              Username should contain letters and numbers only with minimum
              length of 3
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change email</Form.Label>
            <Form.Control {...email} placeholder={user.email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change fullname</Form.Label>
            <Form.Control {...fullname} placeholder={user.fullname} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Change password</Form.Label>
            <Form.Control {...oldPassword} placeholder="old password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              {...newPassword}
              type={passType}
              placeholder="new password"
            />
            <Form.Text className="text-muted">
              Password should contain at least 1 uppercase, 1 lowercase letter,
              1 number and 1 special character. Minimum length 8.
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
          <Button className="form-button" variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <Button variant="danger">Delete Account</Button>
        <p className="text-muted">
          This action is irreversible, all your data will be removed
        </p>
      </Container>
    );
  }
};

export default Settings;
