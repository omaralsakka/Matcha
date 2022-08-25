import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import picturesReducer from "./reducers/picturesReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    pictures: picturesReducer,
  },
});

export default store;
