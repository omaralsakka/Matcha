import { updateUsersStatus } from "../reducers/usersReducer";
import { useStoreUsers } from "./getStoreStates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UpdateStatus = (loggedUser) => {
  const storeUsers = useStoreUsers();
  const dispatch = useDispatch();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const status = JSON.stringify({
        status: "online",
        userId: loggedUser.id,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
    } else {
      const status = JSON.stringify({
        status: "offline",
        userId: loggedUser.id,
      });
      navigator.sendBeacon(
        "http://localhost:5000/api/user/user-status",
        status
      );
    }
  });

  useEffect(() => {
    const status = JSON.stringify({
      status: "online",
      userId: loggedUser.id,
    });
    navigator.sendBeacon("http://localhost:5000/api/user/user-status", status);
  }, [loggedUser]);

  useEffect(() => {
    if (storeUsers.users.length) {
      const refreshStatus = setTimeout(
        () => dispatch(updateUsersStatus(storeUsers.users)),
        5000
      );
      return () => clearTimeout(refreshStatus);
    }
  }, [storeUsers.users]);
};

export default UpdateStatus;
