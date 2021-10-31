const {createBook, getAllBooks, getOneBook, updateBook, deleteBook, borrowBook, returnBook} = require('./../controllers/bookController');
const {createUser, getAllUsers, getOneUser, updateUser, deleteUser} = require('./../controllers/userController');

const routeHandler = {};

routeHandler.Books = (data, callback) => {
    const acceptableHeaders = ["post", "get", "put", "delete"];
    if (acceptableHeaders.indexOf(data.method) > -1) {
        if (data.method == "get" && data.query.id) {
            routeHandler._books.getOne(data, callback);
        }else if(data.method == "put" && data.query.action && data.query.action.toLowerCase() == "borrow"){
            routeHandler._books.borrow(data, callback);
        }else if(data.method == "put" && data.query.action && data.query.action.toLowerCase() == "return"){
            routeHandler._books.return(data, callback);
        }else {
            routeHandler._books[data.method](data, callback);
        }
    } else {
        callback(405);
    }
};

routeHandler.Users = (data, callback) => {
    const acceptableHeaders = ["post", "get", "put", "delete"];
    if (acceptableHeaders.indexOf(data.method) > -1) {
        if (data.method == "get" && data.query.id) {
            routeHandler._users.getOne(data, callback);
        }else {
            routeHandler._users[data.method](data, callback);
        } 
    } else {
        callback(405);
    }
};

//main book route object
routeHandler._books = {};

//main user route object
routeHandler._users = {};

//Post route -- for creating a book
routeHandler._books.post = createBook;

//Get route -- for geting all books
routeHandler._books.get = getAllBooks;

//Get route -- for geting a book
routeHandler._books.getOne = getOneBook;

//Put route -- for updating a book
routeHandler._books.put = updateBook;

//Delete route -- for deleting a book
routeHandler._books.delete = deleteBook;

//borrow route -- for borrowing a book
routeHandler._books.borrow = borrowBook;

//Return route -- for Returning a book
routeHandler._books.return = returnBook;


//Post route -- for creating a user
routeHandler._users.post = createUser;

//Get route -- for geting all users
routeHandler._users.get = getAllUsers;

//Get route -- for geting a user
routeHandler._users.getOne = getOneUser;

//Put route -- for updating a user
routeHandler._users.put = updateUser;

//Delete route -- for deleting a user
routeHandler._users.delete = deleteUser;


routeHandler.ping = (data, callback) => {
    callback(200, { response: "server is live" });
};
routeHandler.notfound = (data, callback) => {
    callback(404, { response: 'not found' });
};

module.exports = routeHandler;