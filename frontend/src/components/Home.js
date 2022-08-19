import { Container, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { getUsersProfileImage } from "../services/usersServices";
import { useStoreUser } from "../utils/getStoreStates";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    dispatch(fetchUsers()).then((resp) => {
      setUsers(resp);
    });
    getUsersProfileImage().then((resp) => {
      setProfilePictures(resp);
    });
  }, [dispatch]);

  useEffect(() => {
    if (sort) {
      const sortedUsers = [...users];

      switch (`${sort} ${order}`) {
        case "age ascending":
          sortedUsers.sort((a, b) => a.age - b.age);
          setUsers(sortedUsers);
          break;
        case "age descending":
          sortedUsers.sort((a, b) => b.age - a.age);
          setUsers(sortedUsers);
          break;
        // case "location":
        //   setSortedUsers(users);
        //   break;
        // case "tags":
        //   setSortedUsers(users);
        //   break;
        case "liked_by ascending":
          sortedUsers.sort((a, b) => a.liked_by.length - b.liked_by.length);
          setUsers(sortedUsers);
          break;
        case "liked_by descending":
          sortedUsers.sort((a, b) => b.liked_by.length - a.liked_by.length);
          setUsers(sortedUsers);
          break;
        default:
          setUsers(sortedUsers);
      }
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
