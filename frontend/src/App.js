import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { tokenLoginCall } from "./reducers/loginReducer";
import LandingPage from "./components/LandingPage";
import AppFooter from "./components/Footer";
import Credentials from "./components/Credentials";
import useStoreUser from "./utils/getStoreUser";

const App = () => {
  const dispatch = useDispatch();
  const userInStore = useStoreUser();
  console.log(userInStore);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedMatchaUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      dispatch(tokenLoginCall(userInfo));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={<Credentials />} />
          </Routes>
        </BrowserRouter>
      </div>
      <AppFooter />
    </div>
  );
};

export default App;
