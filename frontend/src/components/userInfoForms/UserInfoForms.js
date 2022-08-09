import InfoForm from "./InfoForm";
import useStoreUser from "../../utils/getStoreUser";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import PicturesForm from "./PicturesForm";
import LocationForm from "./LocationForm";

const UserInfoForms = () => {
  const userStore = useStoreUser();
  const [loading, setLoading] = useState(true);
  const [visibleForm, setVisibleForm] = useState("");

  useEffect(() => {
    if (userStore.user) {
      setLoading(false);
      if (userStore.user.gender) {
        if (userStore.user.pictures) {
          setVisibleForm(3);
        } else {
          setVisibleForm(2);
        }
      } else {
        setVisibleForm(1);
      }
      // userStore.user.gender ? setVisibleForm(2) : setVisibleForm(1);
    }
  }, [userStore.user]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  } else {
    switch (visibleForm) {
      case 1:
        return <InfoForm setVisibleForm={setVisibleForm} />;
      case 2:
        return <PicturesForm setVisibleForm={setVisibleForm} />;
      case 3:
        return <LocationForm />;
      default:
        return;
    }
  }
};

export default UserInfoForms;
