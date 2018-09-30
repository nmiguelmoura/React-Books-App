import React from 'react';
import { Link } from 'react-router-dom';

const Book = (props) => {
    const book = props.book;
    return(
        <div>
            <Link
                to={`/book/${book.id}`}>
                <img
                    src={book.imageLinks.smallThumbnail}
                    alt={book.title} />
                <p>{book.title}</p>
                <p>{book.authors.reduce((acc, current) => {
                    return `${acc}, ${current}`;
                })}</p>
            </Link>
        </div>
    );
};

export default Book;