import React, { useState } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom";
import Book from "./Book";

const Search = (p) => {

  Search.propTypes = {
    booksArr: PropTypes.array.isRequired,
    changeCategory: PropTypes.func.isRequired
  }

  let [query, setquery] = useState("");
  let [searchItems, setsearchItems] = useState([]);

  const updateQuery = (query) => {
    setquery(query);

    BooksAPI.search(query).then((res) => {
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; i < p.booksArr.length; j++) {
            if (res[i].id === p.booksArr[j].id) {
              const shelvedIdx = p.booksArr.findIndex((book) => book.id === res[i].id)
              res[i].shelf = p.booksArr[shelvedIdx].shelf
            }
          }
        }
      }
    })
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author"
            onChange={(event) => updateQuery(event.target.value)} />

        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {
            searchItems && searchItems.length > 0 && searchItems.map((book) => (
              <Book
                key={book.id}
                changeCategory={p.changeCategory}
                currBook={book}
              />
            ))
          }
        </ol>
      </div>

    </div>
  )
}

export default Search