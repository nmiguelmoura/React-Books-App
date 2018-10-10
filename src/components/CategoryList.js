import React from 'react';
import BookThumb from './BookThumb';
import PropTypes from 'prop-types';
import styles from './CategoryList.module.css';

const CategoryList = (props) => {
    return(
        <div className={`container-fluid ${styles.main}`}>
            <div className='row'>
                <div className='col-12'>
                    <h2 className={styles.h2}>{props.name.toUpperCase()}</h2>
                </div>
            </div>
            <ul className='row'>
                {props.books.map(book => (
                    <li key={book.id} className={`col-6 col-md-3 col-lg-2 col-xl-1 ${styles.li}`}>
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