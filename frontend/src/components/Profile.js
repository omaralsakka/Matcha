import { Container, Card } from "react-bootstrap";
import { useStoreUser } from "../utils/getStoreStates";
import LoadingScreen from "./LoadingScreen";
import PicturesForm from "./userInfoForms/PicturesForm";
import { useState, useEffect } from "react";
import { getUsersImages } from "../services/usersServices";
const Profile = () => {
  const { user } = useStoreUser();
  const [userPictures, setUserPictures] = useState([]);

  useEffect(() => {
    if (user) {
      getUsersImages(user.user_id).then((resp) => {
        setUserPictures(resp);
      });
    }
  }, [user]);
  if (!user || !userPictures) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="mt-5">
        <h1>This is profile page</h1>
        <h3>{user.fullname}</h3>
        <PicturesForm defaultValue={userPictures} />
      </Container>
    );
  }
};

export default Profile;
