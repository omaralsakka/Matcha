import { useEffect } from "react";

const UpdateStatus = (loggedUser) => {

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


};

export default UpdateStatus;
