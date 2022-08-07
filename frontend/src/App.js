import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { tokenLoginCall } from "./reducers/loginReducer";
import LandingPage from "./components/LandingPage";
import AppFooter from "./components/footer/Footer";
import Credentials from "./components/Credentials";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import InfoForm from "./components/InfoForm";
import Terms from "./components/footer/Terms";
import About from "./components/footer/About";

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
      </BrowserRouter>
    </div>
  );
};

export default App;
