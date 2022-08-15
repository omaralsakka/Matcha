import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  },
});

export default store;
