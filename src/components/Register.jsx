/* TODO - add your code to create a functional React component 
that renders a registration form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setToken }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = response.data;
      console.log(result);
      if (result.success && result.data?.token) {
        setToken(result.data.token);
        setSuccess(true);
        setError(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        alert("Registered Successfully");
        setTimeout(() => navigate("/"), 500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess(false);
      console.error(err);
    }
  }

  return (
    <>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>Signed Up Successfully</p>}

      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name: </p>
          <input
            type="text"
            value={firstName}
            maxLength={12}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name: </p>
          <input
            type="text"
            value={lastName}
            maxLength={12}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email: </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password: </p>
          <input
            type="password"
            value={password}
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Register;
