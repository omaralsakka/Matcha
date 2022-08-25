import { Container, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers, getUsersByCountry } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { getUsersProfileImage } from "../services/usersServices";
import { useStoreUser, useStoreUsers } from "../utils/getStoreStates";
import sortUsers from "../utils/sortUsers";
import { filterBlocked, filterBlockedBy } from "../utils/filters";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const usersInStore = useStoreUsers();
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    if (user) {
      dispatch(getUsersByCountry(user.country, user)).then((resp) => {
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

  useEffect(() => {
    if (usersInStore.users) {
      if (usersInStore.users.length) {
        setUsers(usersInStore.users);
      } else {
        setUsers([]);
      }
    }
  }, [usersInStore.users]);

  if (!users || !profilePictures.length || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container>
          <HomeNavBar setSort={setSort} setOrder={setOrder} />
          <Container className="d-flex">
            {users.length ? (
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
            ) : (
              <Container className="text-center mt-5">
                <strong className="fs-1">Users not found</strong>
              </Container>
            )}
          </Container>
        </Container>
      </>
    );
  }
};

export default Home;
