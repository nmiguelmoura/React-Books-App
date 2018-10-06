import React, {Component} from 'react';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import BookDetail from './components/BookDetail';
import { LIST_TYPES, STATUS } from "./helpers/Constants";
import * as BooksAPI from "./helpers/BooksAPI";
import styles from './app.css';

class App extends Component {
    state = {
        shelf: []
    };

    componentDidMount() {
        BooksAPI.getAll()
        .then(shelf => {
            if(!Array.isArray(shelf)) {
                shelf = [];
            }

            this.setState(prev => ({
                shelf
            }));
        })
        .catch(error => console.log(error))
    }

    changeBookStatus = (id, status) => {
        BooksAPI.update(id, status)
            .then(() => {
                let shelf = this.state.shelf;
                if(status === STATUS.NONE) {
                    const index = this.state.shelf.findIndex(book => {
                        return book.id === id;
                    });

                    shelf.splice(index, 1);
                } else {
                    shelf.find(book => {
                        if(book.id === id) {
                            book.shelf = status;
                        }

                        return book.id === id;
                    });
                }

                this.setState(prev => ({
                    shelf
                }));
            })
        .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="App">
                <Header />
                <Route
                    exact path='/'
                    render={() => (
                        <SearchBooks
                            type={LIST_TYPES.SHELF}
                            shelf={this.state.shelf}
                            changeBookStatus={this.changeBookStatus}
                        />
                    )}
                />

                <Route
                    path='/search'
                    render={() => (
                        <SearchBooks
                            type={LIST_TYPES.SEARCH}
                            shelf={this.state.shelf}
                            changeBookStatus={this.changeBookStatus}
                        />
                    )}
                />

                <Route
                    path='/book/:id'
                    component={BookDetail}
                />
            </div>
        );
    }
}

export default App;
