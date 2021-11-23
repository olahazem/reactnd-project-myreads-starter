import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search.js"
import Category from './Category'
import { Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


const BooksApp = () => {

  let [booksArr, setbooksArr] = useState([]);
  let [flag, setflag] = useState(true);

  //////////////////
  useEffect(() => {
    BooksAPI.getAll().then((booksArr) => { setbooksArr(booksArr); })
  }, []);

  const changeCategory = (currentBook, shelf) => {
    const newBooksArr = booksArr
    const found = booksArr.find(book => book.id === currentBook.id)
    if (!found) {
      currentBook.shelf = shelf
      newBooksArr.push(currentBook)
    }
    else {
      //find it in the booksArr
      const idx = newBooksArr.findIndex((book) => book.id === currentBook.id)
      newBooksArr[idx].shelf = shelf
    }

    setbooksArr(newBooksArr);

    //updateAPI
    BooksAPI.update(currentBook, shelf)
    setflag(!flag);
  }

  return (

    <div className="app">
      <Route
        path="/Search"
        render={() => (
          <Search
            changeCategory={changeCategory}
            booksArr={booksArr}
          />
        )}
      />

      <Route
        exact path="/"
        render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Category
                  className="bookshelf"
                  title="Currently Reading"
                  booksArr={booksArr.filter((book) => book.shelf === "currentlyReading")}
                  changeCategory={changeCategory}
                />

                <Category
                  className="bookshelf"
                  title="Want to Read"
                  booksArr={booksArr.filter((book) => book.shelf === "wantToRead")}
                  changeCategory={changeCategory}
                />

                <Category
                  className="bookshelf"
                  title="Read"
                  booksArr={booksArr.filter((book) => book.shelf === "read")}
                  changeCategory={changeCategory}
                />
              </div>
            </div>
            <div className="open-search">

              <Link to="/search">
                <button className="open-search">
                  Search Library
                </button>
              </Link>
            </div>
          </div>
        )}
      />

    </div>
  )
}

export default BooksApp
