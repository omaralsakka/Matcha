import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { tokenLoginCall } from "./reducers/loginReducer";
import LandingPage from "./components/LandingPage";
import AppFooter from "./components/footer/Footer";
import Credentials from "./components/Credentials";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import InfoForm from "./components/InfoForm";
import Terms from "./components/footer/Terms";
import About from "./components/footer/About";
import useJWT from "./utils/decryptToken";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const { decodedToken, isExpired } = useJWT(token);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedMatchaUser");
    if (loggedUserJson) {
      const userToken = JSON.parse(loggedUserJson);

      setToken(userToken.token);
    }
  }, []);

  useEffect(() => {
    setLoggedUser(decodedToken);
  }, [decodedToken]);

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser.username) {
        dispatch(tokenLoginCall(decodedToken));
      }
    }
  }, [loggedUser, dispatch]);
  console.log(decodedToken);
  if (!loggedUser) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={<Credentials setLoggedUser={setLoggedUser} />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <AppFooter />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={loggedUser ? <Navigate to="/home" /> : <LandingPage />}
          />
          <Route
            path="/*"
            element={
              loggedUser ? (
                <Navigate to="/home" />
              ) : (
                <Credentials setLoggedUser={setLoggedUser} />
              )
            }
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
            <Route
              path="/home"
              element={loggedUser.infoFilled ? <Home /> : <InfoForm />}
            />
          </Route>
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <AppFooter />
      </div>
    );
  }
};

export default App;
