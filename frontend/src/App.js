import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import Credentials from "./components/Credentials";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Verified from "./components/Verified";
import { useDispatch } from "react-redux";
import { tokenLoginCall } from "./reducers/loginReducer";
import Index from "./components/Index";
import Footer from "./components/Footer";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("LoggedMatchaUser");
    if (loggedUserJson) {
      const userInfo = JSON.parse(loggedUserJson);
      dispatch(tokenLoginCall(userInfo));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/" element={<Credentials />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/api/verify/:code" element={<Verified />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
};

export default App;
