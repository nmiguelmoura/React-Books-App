import React, {Component} from 'react';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import SearchBooks from './components/SearchBooks';
import BookDetail from './components/BookDetail';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Route
                    exact path='/'
                    component={BookShelf}
                />

                <Route
                    path='/search'
                    component={SearchBooks}
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
