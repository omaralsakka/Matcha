import { useSelector } from "react-redux";

export const useStoreUser = () => {
  const user = useSelector((state) => {
    if (state.login.user) {
      if (state.login.user.loggedUser) {
        return state.login.user.loggedUser;
      } else {
        return false;
      }
    }
  });
  return {
    user,
  };
};

export const useStoreUsers = () => {
  const user = useSelector((state) => {
    if (state.users.users) {
      return state.users;
    } else {
      return false;
    }
  });
  return user;
};

export const useStoreConnections = () => {
  const users = useSelector((state) => {
    if (state.connections.users) {
      return state.connections.users;
    } else {
      return false;
    }
  });
  return users;
};

export const useStoreMatch = (id) => {
  const user = useSelector((state) => {
    if (state.connections.users) {
      if (state.connections.users.length) {
        return state.connections.users.filter((user) => user.user_id === id);
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
  return user;
};

export const useStoreNotifications = () => {
  const notifications = useSelector((state) => {
    if (state.notifications.notifications) {
      return state.notifications;
    } else {
      return false;
    }
  });
  return notifications;
};
