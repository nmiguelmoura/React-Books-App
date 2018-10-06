import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { STATUS_LIST } from '../helpers/Constants';

const StatusList = (props) => {
    return(
        <div>
            <button onClick={() => {
                props.toggleBookMenu(props.bookId);
            }}>
                <FontAwesomeIcon icon={faSortDown}/>
            </button>

            <div
                style={{
                    display: props.menuOpen ? 'block' : 'none'
                }}>
                <ul>
                    {STATUS_LIST.map(item => (
                        <li
                            key={item.id}
                            data-selected={props.shelf === item.id || (!props.shelf && item.id === 0)}
                            onClick={() => {
                                props.changeBookStatus(props.bookId, item.id);
                            }}
                            >{props.shelf === item.id ? '-> ' : ''}{item.text}</li>
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