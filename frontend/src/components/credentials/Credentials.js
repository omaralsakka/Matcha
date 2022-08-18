import Signup from "./Signup";
import { Routes, Route } from "react-router-dom";
import Verified from "../Verified";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "../settings/VerifyEmail";

const Credentials = ({ setLoggedUser }) => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setLoggedUser={setLoggedUser} />} />
      <Route path="/api/verify/:code" element={<Verified />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
	  <Route path="/api/forgotpassword/:code" element={<ResetPassword />} />
	  <Route path="/api/verify-email/:code" element={<VerifyEmail />} />
    </Routes>
  );
};

export default Credentials;
