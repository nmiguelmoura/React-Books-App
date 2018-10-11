import React, {Component} from 'react';
import Header from './components/Header';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ListBooks from './components/ListBooks';
import BookDetail from './components/BookDetail';
import { LIST_TYPES, STATUS } from "./helpers/Constants";
import * as BooksAPI from "./helpers/BooksAPI";
import 'typeface-roboto';
import './app.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';

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

    changeBookStatus = (id, status, bookInfo) => {
        BooksAPI.update(id, status)
            .then(() => {
                let shelf = this.state.shelf;
                if(status === STATUS.NONE) {
                    const index = this.state.shelf.findIndex(book => {
                        return book.id === id;
                    });

                    shelf.splice(index, 1);
                } else {
                    const book = shelf.find(b => {
                            if(b.id === id) {
                                b.shelf = status;
                            }

                            return b.id === id;
                        });

                    if(!book) {
                        bookInfo.shelf = status;
                        shelf.push(bookInfo);
                    }
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
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames='fade' timeout={300} appear>
                        <Switch location={this.props.location}>
                            <Route
                                exact path='/'
                                render={() => (
                                    <ListBooks
                                        type={LIST_TYPES.SHELF}
                                        shelf={this.state.shelf}
                                        changeBookStatus={this.changeBookStatus}
                                    />
                                )}
                            />

                            <Route
                                path='/search'
                                render={() => (
                                    <ListBooks
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
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default withRouter(App);
