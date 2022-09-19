import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { tokenLoginCall } from "./reducers/loginReducer";
import LandingPage from "./components/LandingPage";
import AppFooter from "./components/footer/Footer";
import Credentials from "./components/credentials/Credentials";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import UserInfoForms from "./components/userInfoForms/UserInfoForms";
import Terms from "./components/footer/Terms";
import About from "./components/footer/About";
import History from "./components/History";
import Settings from "./components/settings/Settings";
import Profile from "./components/Profile";
import {isJsonString, useJWT} from "./utils/tokenTools";

// This is needed for generating random users, DONT UNCOMMENT
// import { getRandomUsers } from "./services/usersServices";
import Chat from "./components/chat/Chat";
import { Container } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");
  const [token, setToken] = useState("");
  const { decodedToken, isExpired } = useJWT(token); // eslint-disable-line

  // This function to add random users, BECAREFUL this will add plenty of users
  //  getRandomUsers();
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedMatchaUser");
    if (isJsonString(loggedUserJson) && loggedUserJson !== null) {
      const userToken = JSON.parse(loggedUserJson);
      setToken(userToken.token);
    } else {
      const url = window.location.href.split("/").pop();
      const paths = [
        "",
        "login",
        "signup",
        "forgot-password",
        "terms",
        "about",
      ];
      if (
        !paths.includes(url) &&
        !window.location.href.includes("/api/verify/code=") &&
        !window.location.href.includes("/api/forgotpassword/code=")
      ) {
        window.location.assign("/");
      }
    }
  }, [loggedUser]);

  useEffect(() => {
    setLoggedUser(decodedToken);
  }, [decodedToken]);

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser.id) {
        dispatch(tokenLoginCall(decodedToken, token));
      }
    }
  }, [loggedUser, decodedToken, token]); // eslint-disable-line

  if (!loggedUser) {
    return (
      <>
        <Container className="min-vh-100 blobs-background" fluid>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/*"
              element={<Credentials setLoggedUser={setLoggedUser} />}
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        <AppFooter />
      </>
    );
  } else {
    setInterval(() => {
      const validToken = window.localStorage.getItem("LoggedMatchaUser");
      if (!validToken) {
        setTimeout(() => {
          const localToken = window.localStorage.getItem("LoggedMatchaUser");
          if (!localToken) {
            window.location.assign("/");
          }
        }, 2000);
      }
    }, 2000);
    return (
      <>
        <Container className="min-vh-100" fluid>
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
              path="/"
              element={
                <Navigation
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser}
                />
              }
            >
              <Route
                path="/home"
                element={loggedUser.infoFilled ? <Home /> : <UserInfoForms />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/settings"
                element={<Settings setLoggedUser={setLoggedUser} />}
              />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        <AppFooter />
      </>
    );
  }
};

export default App;
