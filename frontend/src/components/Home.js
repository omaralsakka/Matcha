import { Container, Row, Image } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersByCountry } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { useStoreUser, useStoreUsers } from "../utils/getStoreStates";
import sortUsers from "../utils/sortUsers";
import searchIcon from "../media/search-empty.png";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const usersInStore = useStoreUsers();
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");
  const [originalUsers, setOriginalUsers] = useState([]);
  useEffect(() => {
    if (user) {
      dispatch(getUsersByCountry(user.country, user)).then((resp) => {
        setUsers(resp);
        setOriginalUsers(resp);
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (usersInStore.users) {
      if (usersInStore.users.length) {
        setUsers(usersInStore.users);
      } else {
        setUsers([]);
      }
    }
  }, [usersInStore.users]);

  useEffect(() => {
    if (sort) {
      if (usersInStore.users) {
        if (usersInStore.users.length) {
          setUsers(sortUsers(usersInStore.users, sort, order));
        }
      }
    }
  }, [sort, order, usersInStore.users]);
  if (!users || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container>
          <HomeNavBar
            setSort={setSort}
            setOrder={setOrder}
            setUsers={setUsers}
            originalUsers={originalUsers}
          />
        </Container>
        <Container>
          {users.length ? (
            <Container>
              {users.map((userToDisplay) => (
                <Row key={userToDisplay.user_id} className="mb-5">
                  <UsersCards
                    user={userToDisplay}
                    loggedUserId={user.user_id}
                    loggedUsername={user.username}
                    loggedUserCoords={user.coordinates}
                  />
                </Row>
              ))}
            </Container>
          ) : (
            <Container className="text-center mt-5">
              <Container className="w-25">
                <Image src={searchIcon} fluid />
              </Container>
              <strong className="fs-1">No users found</strong>
            </Container>
          )}
        </Container>
      </>
    );
  }
};

export default Home;
