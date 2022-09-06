import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import picturesReducer from "./reducers/picturesReducer";
import connectionsReducer from "./reducers/connectionsReducer";
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    pictures: picturesReducer,
    connections: connectionsReducer,
    notifications: notificationsReducer,
  },
});

export default store;
