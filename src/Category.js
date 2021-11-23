import React from "react";
import PropTypes from "prop-types"
import Book from "./Book.js"

const Category = (props) => {

    Category.propTypes = {
        title: PropTypes.string.isRequired,
        booksArr: PropTypes.array.isRequired,
        changeCategory: PropTypes.func.isRequired
    }

    return <div className="bookshelf">
        
        <h2 className="bookshelf-title">
            {props.title}
        </h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    
                    props.booksArr.map((book) =>
                        <Book key={book.id}
                            changeCategory={props.changeCategory}
                            currBook={book}
                        />
                    )
                }
            </ol>
        </div>
    </div>

}

export default Category