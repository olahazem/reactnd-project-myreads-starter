import React from "react";
import PropTypes from 'prop-types'
import UpdateCategory from "./updateCategory.js"


//p === props
const Book = (props) => 
{

    Book.propTypes = {
        changeCategory: PropTypes.func.isRequired,
        currBook: PropTypes.object.isRequired
    }

    const {title, authors} = props.currBook;

    return <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, height: 192,
                            backgroundImage: ((props.currBook.imageLinks && props.currBook.imageLinks.smallThumbnail) ?
                                `url(${props.currBook.imageLinks.smallThumbnail})` : "none")
                        }}>
                    </div>
                    <UpdateCategory
                        changeCategory={props.changeCategory}
                        category={props.currBook.shelf}
                        currBook={props.currBook}
                    />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                {
                    (authors && authors.length) > 1 ? authors.join(", ") : authors
                }
                </div>
            </div>
        </li>

    
}

export default Book;