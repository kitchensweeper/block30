/* TODO - add your code to create a functional React component 
that renders account details for a logged in user. 
Fetch the account data from the provided API. 
You may consider conditionally rendering a message 
for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Account.css";

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  const handleReturn = async (book) => {
    try {
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser((prev) => ({
        ...prev,
        books: prev.books.filter((book) => book.id !== book),
      }));
      console.log("Returned Successfully");
      window.location.reload();
    } catch (err) {
      console.error("Return failed:", err);
    }
  };

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <p>First Name: {user?.firstname}</p>
      <p>Last Name: {user?.lastname}</p>
      <p>Email: {user?.email}</p>
      <p>Checked Out Books:</p>
      {user?.books.length ? (
        <div className="account-book-container">
          {user.books.map((book) => (
            <div key={book.id} className="checked-book-container">
              <img src={book.coverimage} alt={book.title} />
              {book.title}
              <br />
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </div>
          ))}
        </div>
      ) : (
        <p>None</p>
      )}
    </div>
  );
}

export default Account;
