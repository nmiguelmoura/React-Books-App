import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header-styles.css';

const Header = (props) => {
    let path = window.location.pathname;
    path = path.split("/");
    path = path.length > 0 ? path[1] : '';

    return(
        <header className='container-fluid'>
            <div className='row'>
                <div className="col-2">
                    {path &&
                    <button
                        className={styles["header-btn"]}
                        onClick={() => {
                            window.history.back();
                        }}>
                        <i className='fa fa-arrow-left'></i>
                    </button>}
                </div>
                <div className='col-8'>
                    <p className={styles.title}>Books</p>
                </div>
                <div className='col-2'>
                    <Link to='/search'>
                        +
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;