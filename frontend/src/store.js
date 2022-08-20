import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import searchReducer from "./reducers/searchReducer";
import picturesReducer from "./reducers/picturesReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    search: searchReducer,
    pictures: picturesReducer,
  },
});

export default store;
