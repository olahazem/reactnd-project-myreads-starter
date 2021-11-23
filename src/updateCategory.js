import React from "react";
import PropTypes from "prop-types";

const UpdateCategory = (p) => {

    UpdateCategory.propTypes = {
        changeCategory: PropTypes.func.isRequired,
        currBook: PropTypes.object.isRequired
    }

    return <div className="book-shelf-changer">
        <select 
        onChange={(event)=>p.changeCategory(p.currBook,event.target.value)}
        value = {(p.currBook.shelf ? p.currBook.shelf : "none")}
        >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>
}

export default UpdateCategory