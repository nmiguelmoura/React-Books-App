import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from "@fortawesome/free-solid-svg-icons/index";
import { INPUT_SEARCH_PLACEHOLDER } from "../res/Texts";
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
    return (
        <div className='container-fluid' style={{ border: '1px solid #DDD' }}>
            <div className='row'>
                <div className='col-10 nopadding'>
                    <input
                        className={styles.input}
                        value={props.query}
                        placeholder={INPUT_SEARCH_PLACEHOLDER}
                        onChange={(event) => {
                            props.searchChange(event.target.value);
                        }}/>
                </div>
                <div className='col-2 nopadding'>
                    <button
                        onClick={props.toggleCategories}
                        className={props.categoriesAvailable ? [styles.cat, styles["cat-active"]].join(" ") : [styles.cat, styles["cat-inactive"]].join(" ")}
                    >
                        <FontAwesomeIcon icon={faClipboardList}/>
                    </button>
                </div>

            </div>
        </div>
    );
};

SearchBar.propTypes = {
    query: PropTypes.string,
    searchChange: PropTypes.func.isRequired,
    toggleCategories: PropTypes.func.isRequired,
    categoriesAvailable: PropTypes.bool
};

export default SearchBar;