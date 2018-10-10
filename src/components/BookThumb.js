import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusList from './StatusList';
import styles from './BookThumb.module.css';

const BookThumb = (props) => {
    const book = props.book;
    return(
        <div className={styles.book}>
            <Link
                className={styles.link}
                to={`/book/${book.id}`}>
                {book.imageLinks && book.imageLinks.smallThumbnail &&
                    <img
                        className={styles.img}
                        src={book.imageLinks.smallThumbnail}
                        alt={book.title} />
                }

                {(!book.imageLinks || !book.imageLinks.smallThumbnail) &&
                    <div className={styles.placeholder}>

                    </div>
                }
                <p className={styles.title}>{book.title}</p>
                <p className={styles['sub-title']}>{book.subtitle}</p>
                <p className={styles.authors}>{book.authors && book.authors.reduce((acc, current) => {
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