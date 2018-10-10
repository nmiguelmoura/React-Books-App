import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons/index";
import { PAGE_TITLES} from "../res/Texts";
import styles from './Header.module.css';

const Header = (props) => {
    let path = window.location.pathname;
    path = path.split("/");
    path = path.length > 0 ? path[1] : '';

    let title;
    switch(path) {
        case 'search':
            title = PAGE_TITLES.SEARCH;
            break;

        case 'book':
            title = PAGE_TITLES.DETAIL;
            break;

        default:
            title = PAGE_TITLES.HOME;
            break;
    }

    return(
        <header className={`container-fluid ${styles.header}`}>
            <div className='row'>
                {path &&
                    <div className="col-1 nopadding">
                        <button
                            className={[styles.btn, styles['btn-left']].join(' ')}
                            onClick={() => {
                                window.history.back();
                            }}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                    </div>
                }
                <div className={path ? 'col-10' : 'col-11'}>
                    <p className={styles.title}>{title}</p>
                </div>
                {path === '' &&
                    <div className='col-1 nopadding'>
                        <Link
                            className={[styles.btn, styles['btn-right']].join(' ')}
                            to='/search'>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Link>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;