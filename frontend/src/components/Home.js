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
import { SEARCH_FETCH_SUCCESS } from "../actions/types";

const straightMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "female" &&
			elem.sexuality === "straight"
		);
	});
	return filteredUsersArr;
}

const gayMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "male" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")
		);
	});
	return filteredUsersArr;
}

const biMale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			(elem.gender === "female" &&
			(elem.sexuality === "straight" ||
			elem.sexuality === "bi")) ||
			(elem.gender === "male" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi"))
		);
	});
	return filteredUsersArr;
}

const straightFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "male" &&
			elem.sexuality === "straight"
		);
	});
	return filteredUsersArr;
}

const gayFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			elem.gender === "female" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")
		);
	});
	return filteredUsersArr;
}

const biFemale = (users) => {
	const filteredUsersArr = users.filter((elem) => {
		return (
			(elem.gender === "female" &&
			(elem.sexuality === "gay" ||
			elem.sexuality === "bi")) ||
			(elem.gender === "male" &&
			(elem.sexuality === "straight" ||
			elem.sexuality === "bi"))
		);
	});
	return filteredUsersArr;
}

const countryFilter = (country, users) => {
	const filteredUsersArr = users.filter((elem) => {
		return elem.country === country;
	});
	return filteredUsersArr;
}

const getPrefrence = (gender, sexuality) => {
	switch(true) {
		case gender === "male" && sexuality === "straight":
			return 1;
		case gender === "male" && sexuality === "gay":
			return 2;
		case gender === "male" && sexuality === "bi":
			return 3;
		case gender === "female" && sexuality === "straight":
			return 4;
		case gender === "female" && sexuality === "gay":
			return 5;
		case gender === "female" && sexuality === "bi":
			return 6;
		default:
			return 0;
	}
}

const choosePrefrence = (prefrence, users) => {
	switch(prefrence) {
		case 1 :
			return straightMale(users);
		case 2 :
			return gayMale(users);
		case 3 :
			return biMale(users);
		case 4 :
			return straightFemale(users);
		case 5 :
			return gayFemale(users);
		case 6 :
			return biFemale(users);
		default:
			return 0;
	}
}

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useStoreUser();
  const [users, setUsers] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
	if(user) {
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
