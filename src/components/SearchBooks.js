import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../helpers/BooksAPI';
import CategoryList from './CategoryList';
import * as Helpers from '../helpers/Helpers';
import SearchBar from './SearchBar';
import NoResults from './NoResults';
import { LIST_TYPES } from '../helpers/Constants';
import {NO_RESULTS} from "../res/Texts";

class SearchBooks extends Component {
    state = {
        shelf: [],
        books: [],
        query: '',
        categorize: false,
        bookMenuOpen: null
    };

    componentDidMount() {
        this.handleShelf(this.props);
    }

    componentWillReceiveProps(props) {
        this.handleShelf(props);
    }

    handleShelf(props) {
        this.setState(prev => ({
            shelf: props.shelf
        }));
    }

    changeBookStatus = (id, status) => {
        this.setState(prev => ({
            bookMenuOpen: null
        }));

        this.props.changeBookStatus(id, status);
    };

    toggleBookMenu = (id) => {
        this.setState(prev => {
            if(prev.bookMenuOpen === id) {
                id = null;
            }

            return {
                bookMenuOpen: id
            }
        });
    };

    searchChange = (value) => {
        this.setState(prev => ({
            query: value
        }), this.performSearch);
    };

    toggleCategories = () => {
        this.setState(prev => ({
            categorize: !prev.categorize
        }));
    };

    showCategoriesButton = () => {
        if(this.state.books.length === 0) {
            return false;
        }

        let aux = null;
        for(const book of this.state.books) {
            if(book.categories.length > 1) {
                return true;
            }

            if(aux && book.categories[0] !== aux) {
                return true;
            }

            aux = book.categories[0];
        }

        return false;
    };

    performSearch = () => {
        if(this.state.query) {
            BooksAPI.search(this.state.query)
            .then(books => {
                if(!Array.isArray(books)) {
                    books = [];
                }

                if(books.length > 0) {
                    let idToShelf = {};
                    for(const book of this.state.shelf) {
                        idToShelf[book.id] = book.shelf;
                    }

                    for(const book of books) {
                        book.shelf = idToShelf[book.id];
                    }
                }

                this.setState(prev => ({
                    books
                }));
            })
            .catch(error => console.log(error));
        }
    };

    renderGroups(groupKeys, groups) {
        return (
            <div>
                {groupKeys.map(key => (
                    <CategoryList
                        name={key}
                        books={groups[key]}
                        key={key}
                        bookStatus={this.props.bookStatus}
                        changeBookStatus={this.changeBookStatus}
                        toggleBookMenu={this.toggleBookMenu}
                        bookMenuOpen={this.state.bookMenuOpen}
                    />
                ))}
            </div>
        );
    }

    checkIfNoResults() {
        if (this.state.books.length === 0) {
            if (this.props.type === 0) {
                return (
                    <NoResults
                        icon={0}
                        message={NO_RESULTS.SHELF} />
                );
            } else if (this.props.type === 1) {
                return (
                    <NoResults
                        icon={this.state.query ? 2 : 1}
                        message={this.state.query ? NO_RESULTS.SEARCH_NO_RESULTS : NO_RESULTS.SEARCH_NO_WORD}
                    />
                );
            }
        }
    }

    render() {
        let groups = {},
            groupKeys;

        switch(this.props.type) {
            case LIST_TYPES.SEARCH:
                if(this.state.books.length > 0) {
                    groups = this.state.categorize ?
                        Helpers.splitByCategories(this.state.books) :
                        {'Search Results': this.state.books};
                }

                groupKeys = Object.getOwnPropertyNames(groups);

                return (
                    <div>
                        <SearchBar
                            query={this.state.query}
                            searchChange={this.searchChange}
                            toggleCategories={this.toggleCategories}
                            categoriesAvailable={this.showCategoriesButton()}
                        />
                        {this.renderGroups(groupKeys, groups)}

                        {this.checkIfNoResults()}
                    </div>
                );

            case LIST_TYPES.SHELF:
            default:
                if(this.state.shelf.length > 0) {
                    groups = Helpers.splitByShelf(this.state.shelf);
                }

                groupKeys = Object.getOwnPropertyNames(groups);
                return (
                    <div>
                        {this.renderGroups(groupKeys, groups)}

                        {this.checkIfNoResults()}
                    </div>
                );
        }
    }
}

SearchBooks.proptypes = {
    type: PropTypes.string,
    shelf: PropTypes.array,
    changeBookStatus: PropTypes.func.isRequired
};

export default SearchBooks;