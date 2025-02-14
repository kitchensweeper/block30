import { useState } from "react";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Link to="/">
          <h1>
            <img id="logo-image" src={bookLogo} />
            Library App
          </h1>
        </Link>

        <Navigations />
        <hr />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/register/" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/books/:id" element={<SingleBook />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// TODO
// React Router to navigate

// SEARCH: browse a library catalog,
// UPDATE: check out books,
// UPDATE: and return books
// review their account,
//
// use the `token`
