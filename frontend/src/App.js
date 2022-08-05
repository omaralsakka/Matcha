import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { tokenLoginCall } from "./reducers/loginReducer";
import LandingPage from "./components/LandingPage";
import AppFooter from "./components/Footer";
import Credentials from "./components/Credentials";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedMatchaUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      dispatch(tokenLoginCall(userInfo));
      setLoggedUser(userInfo);
    }
  }, [dispatch]);
  console.log(loggedUser);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedUser ? <Navigate to="/home" /> : <LandingPage />}
          />
          <Route
            path="/*"
            element={loggedUser ? <Navigate to="/home" /> : <Credentials />}
          />
          <Route
            path="/home"
            element={
              <Navigation
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </div>
  );
};

export default App;
