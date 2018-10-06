import React from 'react';
import BookThumb from './BookThumb';
import PropTypes from 'prop-types';

const CategoryList = (props) => {
    return(
        <div>
            <h2>{props.name.toUpperCase()}</h2>
            <ul>
                {props.books.map(book => (
                    <li key={book.id}>
                        <BookThumb
                            book={book}
                            changeBookStatus={props.changeBookStatus}
                            menuOpen={props.bookMenuOpen === book.id}
                            toggleBookMenu={props.toggleBookMenu}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

CategoryList.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookMenuOpen: PropTypes.string,
    toggleBookMenu: PropTypes.func.isRequired,
    changeBookStatus: PropTypes.func.isRequired
};

export default CategoryList;