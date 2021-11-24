import React, { useState,  useMemo } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom";
import Book from "./Book";
import { useAsync } from "react-async"
import debounce from 'lodash/debounce';

const Search = (props) => {

  Search.propTypes = {
    booksArr: PropTypes.array.isRequired,
    changeCategory: PropTypes.func.isRequired
  }

  let [query, setquery] = useState("");
  let [searchItems, setsearchItems] = useState([]);


  const updateQuery = async(query) => {

    const allBooks = props.booksArr
    setquery(query);
    setsearchItems([])
    console.log("start")
    console.log(searchItems)
    var newResults = []
    if (query !== "") {
    await BooksAPI.search(query)
      .then((res) => {
        if (res && res.length > 0) {
          // console.log(res)

          let size = res.length
          for (let i = 0; i < size; i++) {

            allBooks.forEach(book => {
              const one = res[i].id
              const two = book.id
              if (one === two) {
                // console.log("found")
                const shelvedIdx = allBooks.findIndex((b) => b.id === res[i].id)
                res[i].shelf = allBooks[shelvedIdx].shelf
                newResults = res.filter((book) => book.id !== res[i].id)
              }
            });
          }
          // console.log(newResults)
          if (newResults.length === 0) {
            newResults = res
          }
          setsearchItems(newResults)
        }
        else {
          // console.log("No books found!")
          setsearchItems([])
        }
      })
    }
    else {
      console.log("No query found!")
      newResults = []
      setsearchItems(newResults)
      console.log(searchItems)
    }
  }

  const debouncedUpdateQuery = useMemo(() => debounce(updateQuery, 250), []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text"
            value={query}
            placeholder="Search by title or author"
            onChange={(event) => debouncedUpdateQuery(event.target.value)} />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {

            searchItems && searchItems.length > 0 && searchItems.map((book) => (

              <Book
                key={book.id}
                changeCategory={props.changeCategory}
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