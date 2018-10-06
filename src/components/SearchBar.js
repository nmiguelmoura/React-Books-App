import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboardList } from "@fortawesome/free-solid-svg-icons/index";

const SearchBar = (props) => {
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
                    value={props.query}
                    onChange={(event) => {
                        props.searchChange(event.target.value);
                    }}/>
                <button
                    onClick={props.toggleCategories}
                    style={{display: props.categoriesAvailable ? 'inline-block' : 'none'}}
                    >
                    <FontAwesomeIcon icon={faClipboardList}/>
                </button>
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