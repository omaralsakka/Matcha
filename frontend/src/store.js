import loginReducer from "./reducers/loginReducer";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
