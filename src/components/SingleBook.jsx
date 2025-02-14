/* TODO - add your code to create a functional React component 
that renders details for a single book. Fetch the book data from
 the provided API. 
 You may consider conditionally rendering a 'Checkout' button 
 for logged in users. */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SingleBook.css";

function SingleBook() {
  const [singleBook, setSingleBook] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((response) => {
        console.log("Book in state:", response.data);
        setSingleBook(response.data.book);
        console.log(singleBook);
        console.log(singleBook.id);
      })
      .catch((err) => console.log("Error fetching single book:", err));
  }, [id]);

  async function handleCheckout() {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${singleBook.id}`,
      { available: false },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("checked out:", response.data);
    window.location.reload();
  }

  return (
    <div className="single-book-card">
      <img src={singleBook?.coverimage} alt={singleBook?.title} />
      <h2>{singleBook?.title}</h2>
      <p>Author: {singleBook?.author}</p>
      <p>Description: {singleBook?.description}</p>
      <p>ID: {singleBook?.id}</p>
      {singleBook?.available ? <p>Available</p> : <p>Checked Out</p>}
      {singleBook.available && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default SingleBook;
