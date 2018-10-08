import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faSearch, faBookOpen } from "@fortawesome/free-solid-svg-icons/index";
import styles from './NoResults.module.css';

const NoResults = (props) => {
    return(
        <div className='container'>
            <div className='row'>
                <div className="col-12">
                    <p className={styles.icon}>
                        {props.icon === 0 && <FontAwesomeIcon icon={faBookOpen} />}
                        {props.icon === 1 && <FontAwesomeIcon icon={faKeyboard} />}
                        {props.icon === 2 && <FontAwesomeIcon icon={faSearch} />}
                    </p>
                    <p className={styles.message}>{props.message}</p>
                </div>
            </div>
        </div>
    );
};

NoResults.propTypes = {
    icon: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
};

export default NoResults;