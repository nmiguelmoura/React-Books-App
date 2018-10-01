export const splitByCategories = (books) => {
    let cat = {};

    books.forEach(book => {
        if(book.categories) {
            book.categories.forEach(category => {
                if(!cat[category])
                    cat[category] = [];

                cat[category].push(book);
            });
        }
    });

    return cat;
};

export const filterBooks = ({books, query, searchBy, categorize}) => {
    if(query) {
        books = books.filter(book => {
            switch(searchBy) {
                case 'author':
                    const authors = book.authors.reduce((acc, current) => {
                        return `${acc} ${current}`;
                    });

                    if(authors.toLowerCase().includes(query)) {
                        return book;
                    }
                    break;

                case 'isbn':
                    const isbn = book.industryIdentifiers.reduce((acc, current) => {
                        return `${acc.identifier} ${current.identifier}`;
                    });

                    console.log(isbn);

                    if(isbn.toLowerCase().includes(query)) {
                        return book;
                    }
                    break;

                case 'title':
                default:
                    if(book.title.toLowerCase().includes(query)
                        || (book.subtitle && book.subtitle.toLowerCase().includes(query))) {
                        return book;
                    }
                    break;
            }

            return false;
        })
    }

    if(categorize) {
        return splitByCategories(books);
    } else {
        return {
            'Search results': books
        }
    }
};