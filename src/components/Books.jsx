/* TODO - add your code to create a functional React component
 that displays all of the available books in the library's 
 catalog. Fetch the book data from the provided API. 
 Users should be able to click on an individual book 
 to navigate to the SingleBook component and view its details. */

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => {
        console.log("API Response:", response.data);
        setBooks(response.data?.books || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="book-container">
          {books.map((book) => (
            <Link to={`/books/${book.id}`} className="book-card" key={book.id}>
              <img
                className="book-img"
                src={book.coverimage}
                alt={book.title || "Book cover"}
              />
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              {book?.available ? <p>Available</p> : <p>Checked Out</p>}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
export default Books;
