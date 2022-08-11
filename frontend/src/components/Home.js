import { Container, CardGroup, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchUsers()).then((resp) => {
      setUsers(resp);
    });
  }, [dispatch]);
  console.log("this is users: ", users);
  if (!users.length) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container>
          <HomeNavBar />
          <Container>
            <Row xs={1} md={3} className="g-4">
              {Array.from(users).map((user) => (
                <UsersCards key={user.username} user={user} />
              ))}
              {/* <CardGroup className="users-cards-wrapper p-3">
          {users.map((user) => (
            <UsersCards key={user.username} user={user} />
          ))}
        </CardGroup> */}
            </Row>
          </Container>
        </Container>
      </>
    );
  }
};

export default Home;
