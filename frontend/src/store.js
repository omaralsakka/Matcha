import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import picturesReducer from "./reducers/picturesReducer";
import connectionsReducer from "./reducers/connectionsReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    pictures: picturesReducer,
    connections: connectionsReducer,
  },
});

export default store;
