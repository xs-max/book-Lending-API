const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const helper = require('./helper')
var lib = {
    baseDir: path.join(__dirname, '/../.data/')
};

// promisifying fs modules
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

//creating
lib.create = async (dir, data, callback) => {
    const filePath = lib.baseDir + dir + '.json';
    fs.readFile(filePath, 'utf-8', (err, file) => {
        if (!err && file) {
            let fileData = JSON.parse(file);
            const entry = fileData.find(item => item.name == data.name);
            if (entry && dir == 'books/books') {
                callback("Book already Exists")
            } else {
                const id = helper.generateRandomString(20);
                data.id = id;
                if (dir == 'users/users') {
                    data.borrowedbooks = [];
                } 
                fileData.push(data);
                const stringData = JSON.stringify(fileData);
                // write th file and close it
                fs.writeFile(filePath, stringData, (err) => {
                    if (err) {
                        callback("Error writing to new file");
                    }
                });
                callback(false, fileData);
            } 
        }
        else {
            callback(err, file);
        }
    });
};

//reading
lib.read = (dir, callback) => {
    const filePath = lib.baseDir + dir  + '.json';
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            callback(false, JSON.parse(data));
        }
        else {
            callback(err, data);
        }
    });
};

//updating
lib.update = (dir, itemToUpdate, data, callback) => {
    const filePath = lib.baseDir + dir  + '.json';
    fs.readFile(filePath, 'utf-8', (err, file) => {
        if (!err && file) {
            let fileData = JSON.parse(file);
            const entry = fileData.findIndex(item => item.id == itemToUpdate);
            if (entry > -1) {
                fileData[entry] = helper.formatObject(fileData[entry], data);
                const stringData = JSON.stringify(fileData);
                fs.writeFile(filePath, stringData, (err) => {
                    if (err) {
                        callback("Error writing to new file");
                    }
                }); 
                callback(false, fileData);
            }else {
                callback(" item not found ");
            }
        }
        else {
            callback(err, file);
        }
    });
};


//Delete an item
lib.delete = (dir, itemToDelete, callback) => {
    const filePath = lib.baseDir + dir  + '.json';
    fs.readFile(filePath, 'utf-8', (err, file) => {
        if(!err && file) {
            let fileData = JSON.parse(file);
            const entry = fileData.findIndex(item => item.id == itemToDelete);
            if (entry > -1) {
                fileData.splice(entry, 1);
                const stringData = JSON.stringify(fileData);
                fs.writeFile(filePath, stringData, (err) => {
                    if (err) {
                        callback("Error writing to new file");
                    }
                }); 
                callback(false, fileData);
            }else {
                callback(" item not found ");
            }
        }else {
            callback(err, file);
        }
    });
};

// borrowing a book
lib.borrow = async (user, book, callback) => {
    const bookPath = path.join(__dirname, '/../.data/books/books.json');
    const userpath = path.join(__dirname, '/../.data/users/users.json');
    try {
        let books = await readFileAsync(bookPath, 'utf-8');
        let users = await readFileAsync(userpath, 'utf-8');
        books = JSON.parse(books);
        users = JSON.parse(users);
        const bookToBorrow = books.findIndex(item => item.id == book);
        const borrower = users.findIndex(item => item.id == user);
        if(bookToBorrow > -1 && borrower > -1) {
            if(books[bookToBorrow].stock > 0){
                if(users[borrower].borrowedbooks.indexOf(books[bookToBorrow].name) < 0) {
                    users[borrower].borrowedbooks.push(books[bookToBorrow].name);
                    books[bookToBorrow] = {
                        ...books[bookToBorrow],
                        stock: books[bookToBorrow].stock - 1
                    }
                    const bookData = JSON.stringify(books);
                    const userdata = JSON.stringify(users);
                    await writeFileAsync(bookPath, bookData);
                    await writeFileAsync(userpath, userdata);
                    callback(false, { message: `${books[bookToBorrow].name} borrowed successfully by ${users[borrower].name}`, data: books[bookToBorrow]});
                }else {
                    callback(false, { message: 'You already borrowed this book before' });
                }
            }else {
                callback(" Book is out of stock and currently not available for lending ");
            }
        }else {
            callback("user or book not found");
        }
        
    }catch(err) {
        callback(err);
    }
}

// returning a book 
lib.return = async (user, book, callback) => {
    const bookPath = path.join(__dirname, '/../.data/books/books.json');
    const userpath = path.join(__dirname, '/../.data/users/users.json');
    try {
        let books = await readFileAsync(bookPath, 'utf-8');
        let users = await readFileAsync(userpath, 'utf-8');
        books = JSON.parse(books);
        users = JSON.parse(users);
        const bookToReturn= books.findIndex(item => item.id == book);
        const borrower = users.findIndex(item => item.id == user);
        if(bookToReturn> -1 && borrower > -1) {   
            const returnedBook = users[borrower].borrowedbooks.findIndex(item => item == books[bookToReturn].name);
            if(users[borrower].borrowedbooks[returnedBook] != undefined) {
                users[borrower].borrowedbooks.splice(returnedBook, 1);
                books[bookToReturn] = {
                    ...books[bookToReturn],
                    stock: books[bookToReturn].stock + 1
                }
                const bookData = JSON.stringify(books);
                const userdata = JSON.stringify(users);
                await writeFileAsync(bookPath, bookData);
                await writeFileAsync(userpath, userdata);
                callback(false, { message: `${books[bookToReturn].name} returned successfully by ${users[borrower].name}`, data: books[bookToReturn]});
            }else {
                callback("You do not have this book ");
            }           
        }else {
            callback("user or book not found");
        }
        
    }catch(err) {
        callback(err);
    }
}


module.exports = lib;