import React from 'react';
import Book from './Book';

const CategoryList = (props) => {
    return(
        <div>
            <h2>{props.name.toUpperCase()}</h2>
            <ul>
                {props.books.map(book => (
                    <li key={book.id}>
                        <Book book={book}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;