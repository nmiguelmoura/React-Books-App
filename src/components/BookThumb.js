import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusList from './StatusList';

const BookThumb = (props) => {
    const book = props.book;
    return(
        <div>
            <Link
                to={`/book/${book.id}`}>
                <img
                    src={book.imageLinks.smallThumbnail}
                    alt={book.title} />
                <p>{book.title}</p>
                <p>{book.subtitle}</p>
                <p>{book.authors && book.authors.reduce((acc, current) => {
                    return `${acc}, ${current}`;
                })}</p>
            </Link>
            <StatusList
                bookId={book.id}
                menuOpen={props.menuOpen}
                toggleBookMenu={props.toggleBookMenu}
                shelf={book.shelf}
                changeBookStatus={props.changeBookStatus}
            />
        </div>
    );
};

BookThumb.propTypes = {
    book: PropTypes.object.isRequired,
    menuOpen: PropTypes.bool,
    toggleBookMenu: PropTypes.func.isRequired,
    changeBookStatus: PropTypes.func.isRequired
};

export default BookThumb;