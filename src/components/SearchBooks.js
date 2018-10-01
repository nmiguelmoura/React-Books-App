import React, { Component } from 'react';
import * as BooksAPI from '../helpers/BooksAPI';
import CategoryList from './CategoryList';
import * as Helpers from '../helpers/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboardList } from '@fortawesome/free-solid-svg-icons';

class SearchBooks extends Component {
    state = {
        books: [],
        query: '',
        searchBy: 'title',
        categorize: false
    };

    componentDidMount() {
        BooksAPI.getAll()
        .then(books => {
            this.setState(prev => ({
                books
            }));

            console.log(this.state.books);
        })
    }

    searchChange =(value) => {
        this.setState(prev => ({
            query: value
        }))
    };

    filterBooks() {
        return Helpers.filterBooks(this.state);
    }

    searchByChange = (value) => {
        this.setState(prev => ({
            searchBy: value
        }));
    };

    toggleCategories = () => {
        this.setState(prev => ({
            categorize: !prev.categorize
        }));
    };

    render() {
        const groups = this.filterBooks(this.state.categorize),
            groupKeys = Object.getOwnPropertyNames(groups);

        return (
            <div>
                <div>
                    <button
                        onClick={() => {
                            window.history.back();
                        }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <input
                        value={this.state.query}
                        onChange={(event) => {
                            this.searchChange(event.target.value);
                        }}/>
                    <select
                        value={this.state.searchBy}
                        onChange={(event) => {
                            this.searchByChange(event.target.value);
                        }}>
                        <option value='title'>Title and subtitle</option>
                        <option value='author'>Author</option>
                        <option value='isbn'>ISBN</option>
                    </select>
                    <button
                        onClick={this.toggleCategories}>
                        <FontAwesomeIcon icon={faClipboardList}/>
                    </button>
                </div>

                {groupKeys.map(key => (
                    <CategoryList
                        name={key}
                        books={groups[key]}
                        key={key}
                    />
                ))}
            </div>
        );
    }
}

export default SearchBooks;