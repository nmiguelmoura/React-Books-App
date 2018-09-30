import React, {Component} from 'react';
import * as BooksAPI from '../helpers/BooksAPI';

class BookDetail extends Component {

    state = {
        searchComplete: false,
        book: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        if (!id)
            return;

        BooksAPI.get(id)
        .then(book => {
            this.setState(prev => ({
                searchComplete: true,
                book
            }));
        })
        .catch(() => {
            this.setState(prev => ({
                searchComplete: true,
                book: null
            }));
        });
    }

    showBookDetail() {
        const book = this.state.book;
        console.log(book);
        return (<div>
            <img src={book.imageLinks.thumbnail} />
            <p>{book.title}</p>
            <p>{book.subTitle}</p>
            <p>{book.description}</p>
        </div>);
    }

    showNoResult() {
        return (<div>
            No books were found!
        </div>);
    }

    render() {
        return (
            <div>
                {this.state.book && this.showBookDetail()}
                {(this.state.searchComplete && !this.state.book) && this.showNoResult()}
            </div>
        );
    }
}

export default BookDetail;