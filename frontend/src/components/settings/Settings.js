import UseField from "../UseField";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useStoreUser } from "../../utils/getStoreStates";
import LoadingScreen from "../LoadingScreen";

const Settings = () => {
  const { user } = useStoreUser();
  const username = UseField("text");
  const fullname = UseField("text");
  const email = UseField("email");
  const password = UseField("password");

  if (!user) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5 mb-3 w-50 ">
        <h1>Settings</h1>
        <hr />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Change username</Form.Label>
            <Form.Control {...username} placeholder={user.username} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Change email</Form.Label>
            <Form.Control {...email} placeholder={user.email} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Change fullname</Form.Label>
            <Form.Control {...fullname} placeholder={user.fullname} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Change password</Form.Label>
            <Form.Control {...password} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="danger">Delete Account</Button>
            <br />
            <Form.Text className="text-muted">
              This action is irreversible, all your data will be removed
            </Form.Text>
          </Form.Group>
        </Form>
      </Container>
    );
  }
};

export default Settings;
