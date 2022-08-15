import { Container, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { getUsersProfileImage } from "../services/usersServices";
const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers()).then((resp) => {
      setUsers(resp);
    });
    getUsersProfileImage().then((resp) => {
      setProfilePictures(resp);
    });
  }, [dispatch]);
  if (!users.length || !profilePictures.length) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container>
          <HomeNavBar />
          <Container>
            <Row md={1}>
              {Array.from(users).map((user) => (
                <UsersCards
                  key={user.username}
                  user={user}
                  profilePictures={profilePictures}
                />
              ))}
            </Row>
          </Container>
        </Container>
      </>
    );
  }
};

{
  /* <Row xs={1} md={3} className="g-4">
{Array.from(users).map((user) => (
  <UsersCards
    key={user.username}
    user={user}
    profilePictures={profilePictures}
  />
))}
</Row> */
}

export default Home;
