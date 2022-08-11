import { Container, CardGroup } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
const Home = () => {
  return (
    <>
      <Container>
        <HomeNavBar />
        <CardGroup style={{ backgroundColor: "red" }} className="p-3">
          <UsersCards />
          <UsersCards />
          <UsersCards />
        </CardGroup>
      </Container>
    </>
  );
};

export default Home;
