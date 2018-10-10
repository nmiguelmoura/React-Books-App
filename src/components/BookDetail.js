import React, {Component} from 'react';
import * as BooksAPI from '../helpers/BooksAPI';
import NoResults from './NoResults';
import {NO_RESULTS} from '../res/Texts';
import styles from './BookDetail.module.css';

class BookDetail extends Component {

    state = {
        searchComplete: false,
        book: null,
        loading: false
    };

    componentDidMount() {
        this.setLoading(true);

        const id = this.props.match.params.id;

        if (!id)
            return;

        BooksAPI.get(id)
        .then(book => {
            this.setState(prev => ({
                searchComplete: true,
                book
            }));
            this.setLoading(false);
        })
        .catch(() => {
            this.setState(prev => ({
                searchComplete: true,
                book: null
            }));
            this.setLoading(false);
        });
    }

    setLoading(loading) {
        this.setState(prev => ({
            loading
        }));
    }

    showBookDetail() {
        const book = this.state.book;
        return (
            <div className={`container ${styles.main}`}>
                <div className="row">
                    <div className={`col-12 ${styles.image}`}>
                        <img alt={book.title} src={book.imageLinks.thumbnail}/>
                    </div>
                    <div className={`col-12 ${styles['primary-info']}`}>
                        <p className={styles.title}>{book.title}</p>
                        <p className={styles['sub-title']}>{book.subtitle}</p>
                        <p className={styles.authors}>{book.authors.reduce((acc, current) => {
                            return `${acc}, ${current}`
                        })}</p>
                    </div>
                    <div className={`col-12 ${styles['secondary-info']}`}>
                        <p className={styles.description}>{book.description}</p>
                    </div>
                    <div className='col-12'>
                        <div className={styles['extra-info']}>
                            <p className={styles.publisher}>{book.publisher}</p>
                            <ul className={styles.identifiers}>
                                {book.industryIdentifiers.map(identifier => (
                                    <li key={identifier.type}>
                                        {`${identifier.type}: ${identifier.identifier}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`col-12 ${styles['preview-info']}`}>
                        <a
                            className={styles['preview-link']}
                            href={book.previewLink}
                            rel="noopener noreferrer"
                            target="_blank">
                            Preview book
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    showNoResult() {
        if (this.state.loading) {
            return (
                <NoResults icon={0} message={NO_RESULTS.LOADING}/>
            );
        }
        if (this.state.searchComplete && !this.state.book) {
            return (
                <NoResults icon={2} message={NO_RESULTS.SEARCH_NO_RESULTS}/>
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.book && this.showBookDetail()}
                {this.showNoResult()}
            </div>
        );
    }
}

export default BookDetail;