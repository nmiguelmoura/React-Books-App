import React, { Component } from 'react';
import * as BooksAPI from '../helpers/BooksAPI';
import CategoryList from './CategoryList';
import * as Helpers from '../helpers/Helpers';

class SearchBooks extends Component {
    state = {
        categories: {}
    };

    componentDidMount() {
        BooksAPI.getAll()
        .then(books => {
            const cat = Helpers.splitByCategories(books);

            this.setState(prev => ({
                categories: cat
            }));

            console.log(this.state.categories);
        })
    }

    render() {
        const categories = Object.getOwnPropertyNames(this.state.categories);
        return (
            <div>
                {categories.map(cat => (
                    <CategoryList
                        name={cat}
                        books={this.state.categories[cat]}
                        key={cat}
                    />
                ))}
            </div>
        );
    }
}

export default SearchBooks;