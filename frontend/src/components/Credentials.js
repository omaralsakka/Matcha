import Signup from "./Signup";
import Login from "./Login";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const Credentials = () => {
  return (
    <>
      <h1>
        <Link to="/signup">Signup</Link>
      </h1>
      <h1>
        <Link to="/login">Login</Link>
      </h1>
      <Outlet />
    </>
  );
};

export default Credentials;
