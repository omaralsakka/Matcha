import { Container, Row } from "react-bootstrap";
import UsersCards from "./homeComponents/UsersCards";
import HomeNavBar from "./homeComponents/homeNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../reducers/usersReducer";
import LoadingScreen from "./LoadingScreen";
import { getUsersProfileImage } from "../services/usersServices";
import { useStoreUser } from "../utils/getStoreStates";
import sortUsers from "../utils/sortUsers";
import { filterBlocked, filterBlockedBy, ageGap, fameGap, tagsFilter } from "../utils/filters";
/* import { SEARCH_FETCH_SUCCESS } from "../actions/types"; */

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const { search } = useSelector((state) => state.search);
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");
  let advancedFilter; //  this can be a state but maybe not necessary

  const getUsers = (user, country) => {
	dispatch(fetchUsers(user, country)).then((resp) => {
		const filtered = filterBlockedBy(user, filterBlocked(user, resp));
		setUsers(filtered);
	});
  }

  useEffect(() => {
	if(user) {
		getUsers(user, user.country);
		getUsersProfileImage().then((resp) => {
		  setProfilePictures(resp);
		});
	}
  }, [dispatch, user]);

  useEffect(() => {
	  if(search.user_id > 0) {
		dispatch(fetchUsers(user, search.country)).then((resp) => {
			advancedFilter = filterBlockedBy(user, filterBlocked(user, resp));
		}).then(() =>{
			advancedFilter = ageGap(search.age_range.min, search.age_range.max, advancedFilter)
		}).then(() => {
			advancedFilter = fameGap(search.fame_range.min, search.fame_range.max, advancedFilter)
		}).then(() => {
			if(search.tags.length)
				advancedFilter = tagsFilter(search, advancedFilter);
		}).then(() => {
			setUsers(advancedFilter);
		})
	  }
  }, [search])

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
  };
};

export default Home;
