import { TEXT_STATUS } from "../res/Texts";

export const LIST_TYPES = {
    SHELF: 0,
    SEARCH: 1
};

export const STATUS = {
    NONE: 'none',
    CURRENTLY_READING: 'currentlyReading',
    WANT_TO_READ: 'wantToRead',
    READ: 'read'
};

export const STATUS_LIST = [
    {
        id: STATUS.NONE,
        text: TEXT_STATUS.NONE
    },
    {
        id: STATUS.CURRENTLY_READING,
        text: TEXT_STATUS.CURRENTLY_READING
    },
    {
        id: STATUS.WANT_TO_READ,
        text: TEXT_STATUS.WANT_TO_READ
    },
    {
        id: STATUS.READ,
        text: TEXT_STATUS.READ
    }
];