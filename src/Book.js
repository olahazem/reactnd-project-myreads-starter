import React from "react";
import PropTypes from 'prop-types'
import UpdateCategory from "./updateCategory.js"


//p === props
const Book = (p) => 
{

    Book.propTypes = {
        changeCategory: PropTypes.func.isRequired,
        currBook: PropTypes.object.isRequired
    }

    return <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, height: 192,
                            backgroundImage: ((p.currBook.imageLinks && p.currBook.imageLinks.smallThumbnail) ?
                                `url(${p.currBook.imageLinks.smallThumbnail})` : "none")
                        }}>
                    </div>
                    <UpdateCategory
                        changeCategory={p.changeCategory}
                        category={p.currBook.shelf}
                        currBook={p.currBook}
                    />
                </div>
                <div className="book-title">{p.currBook.title}</div>
                <div className="book-authors">
                {
                    (p.currBook.authors && p.currBook.authors.length) > 1 ? p.currBook.authors.join(", ") : p.currBook.authors
                }
                </div>
            </div>
        </li>

    
}

export default Book;