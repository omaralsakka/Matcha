import { Container, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { getUsersProfileImage } from "../services/usersServices";
import { useStoreUser } from "../utils/getStoreStates";
import sortUsers from "../utils/sortUsers";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers(user)).then((resp) => {
        setUsers(resp);
      });
      getUsersProfileImage().then((resp) => {
        setProfilePictures(resp);
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (sort) {
      setUsers(sortUsers(users, sort, order));
    }
  }, [sort, order]);

  if (!users.length || !profilePictures.length || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container>
          <HomeNavBar setSort={setSort} setOrder={setOrder} />
          <Container className="d-flex">
            <Container className="users-cards-wrapper">
              {users.map((userToDisplay) => (
                <div key={userToDisplay.user_id}>
                  <Row className="mb-5">
                    <UsersCards
                      user={userToDisplay}
                      profilePictures={profilePictures}
                      loggedUserId={user.user_id}
                    />
                  </Row>
                </div>
              ))}
            </Container>
          </Container>
        </Container>
      </>
    );
  }
};

export default Home;
