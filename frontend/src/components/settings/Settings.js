import UseField from "../UseField";
import { Card, Container } from "react-bootstrap";
import { useStoreUser } from "../../utils/getStoreStates";
import LoadingScreen from "../LoadingScreen";

const Settings = () => {
  const { user } = useStoreUser();

  if (!user) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5">
        <h1>this is settings</h1>
        <h3>{user.fullname}</h3>
      </Container>
    );
  }
};

export default Settings;
