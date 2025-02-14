/* TODO - add your code to create a functional React component
that renders a navigation bar for the different views in your
single page application. You may consider conditionally rendering
 some options - for example 'Login' should be available 
 if someone has not logged in yet. */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigations.css";

function Navigations() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/account" className="nav-link">
              Account
            </Link>

            <button onClick={handleLogout} className="nav-link">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>

            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navigations;
