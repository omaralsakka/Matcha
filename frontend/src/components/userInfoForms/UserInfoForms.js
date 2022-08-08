import InfoForm from "./InfoForm";
import useStoreUser from "../../utils/getStoreUser";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";
import PicturesForm from "./PicturesForm";

const UserInfoForms = () => {
  const userStore = useStoreUser();
  const [loading, setLoading] = useState(true);
  //   console.log("this is userStore: ", userStore);

  useEffect(() => {
    if (userStore.user) {
      setLoading(false);
    }
  }, [userStore.user]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  } else {
    return (
      <>
        <PicturesForm />
      </>
    );
  }
};

export default UserInfoForms;
