import { Container, Card } from "react-bootstrap";
import { useStoreUser } from "../utils/getStoreStates";
import LoadingScreen from "./LoadingScreen";

const Profile = () => {
  const { user } = useStoreUser();
  if (!user) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5">
        <h1>This is profile page</h1>
        <h3>{user.fullname}</h3>
      </Container>
    );
  }
};

export default Profile;