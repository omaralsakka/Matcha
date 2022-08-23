import InfoForm from "./InfoForm";
import { useStoreUser } from "../../utils/getStoreStates";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import PicturesForm from "./PicturesForm";

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
        return <PicturesForm defaultValue={""} />;
      case 3:
        return <LoadingScreen />;
      default:
        return;
    }
  }
};

export default UserInfoForms;
