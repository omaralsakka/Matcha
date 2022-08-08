import Signup from "./Signup";
import { Routes, Route } from "react-router-dom";
import Verified from "./Verified";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
const Credentials = ({ setLoggedUser }) => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setLoggedUser={setLoggedUser} />} />
      <Route path="/api/verify/:code" element={<Verified />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Credentials;
