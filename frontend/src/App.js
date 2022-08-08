import "./App.css";
import Credentials from "./components/Credentials";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Verified from "./components/Verified";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
	
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Credentials />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/verify/:code" element={<Verified />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
