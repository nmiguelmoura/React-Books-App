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