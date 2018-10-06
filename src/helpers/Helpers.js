import {TEXT_STATUS} from "../res/Texts";

export const splitByCategories = (books) => {
    let cat = {};

    if(books) {
        books.forEach(book => {
            if(book.categories) {
                book.categories.forEach(category => {
                    if(!cat[category])
                        cat[category] = [];

                    cat[category].push(book);
                });
            }
        });
    }

    return cat;
};

export const splitByShelf = (books) => {
    let shelfs = {};

    let shelfName;

    for(const book of books) {
        if(!book.shelf) {
            continue;
        }

        shelfName = getShelfName(book.shelf);

        if(!shelfs[shelfName]) {
            shelfs[shelfName] = [];
        }

        shelfs[shelfName].push(book);
    }

    return shelfs;
};

const getShelfName = (shelf) => {
    switch(shelf) {
        case 'wantToRead':
            return TEXT_STATUS.WANT_TO_READ;

        case 'currentlyReading':
            return TEXT_STATUS.CURRENTLY_READING;

        case 'read':
            return TEXT_STATUS.READ;

        default:
            return '';
    }
};