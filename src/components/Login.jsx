/* TODO - add your code to create a functional React component
 that renders a login form */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      console.log("Logged in:", data);
      setSuccess(true);
      localStorage.setItem("token", data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed:", err);
    }
  };
  return (
    <>
      <h2>Log-in</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>Logged in!</p>}

      <form onSubmit={handleSubmit}>
        <label>
          <p>Email: </p>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password: </p>
          <input
            type="password"
            name="password"
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;

//  fetch('/api/users/login', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: 'ssmith@example.com',
//       password: 'sam345'
//     })
//   }).then(response => response.json())
//     .then(result => {
//       console.log(result);
//     })
//     .catch(console.error);
