import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { STATUS_LIST } from '../helpers/Constants';
import styles from './StatusList.module.css';

const StatusList = (props) => {
    return(
        <div className={styles.main}>
            <button
                className={styles.button}
                onClick={() => {
                    props.toggleBookMenu(props.bookId);
                }}><p className={styles['button-icon']}>
                    <FontAwesomeIcon
                        className={styles['button-icon']}
                        icon={faSortDown}/>
                </p>
            </button>

            <div
                className={styles.selector}
                style={{
                    display: props.menuOpen ? 'block' : 'none'
                }}>
                <ul>
                    {STATUS_LIST.map(item => (
                        <li
                            className={styles.li}
                            key={item.id}
                            data-selected={props.shelf === item.id || (!props.shelf && item.id === 0)}
                            onClick={() => {
                                props.changeBookStatus(props.bookId, item.id);
                            }}
                            >{item.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

StatusList.propTypes = {
    bookId: PropTypes.string.isRequired,
    menuOpen: PropTypes.bool,
    shelf: PropTypes.string,
    toggleBookMenu: PropTypes.func.isRequired,
    changeBookStatus: PropTypes.func.isRequired
};

export default StatusList;