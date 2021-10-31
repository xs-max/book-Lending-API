const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const fileUtil = require('./../lib/fileUtil');
const { getOne, getAll, update, deleteOne } = require('./handlerFactory');


const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

exports.createBook = (reqData, callback) => {
    //validate that all required fields are filled out
    var name = typeof (reqData.payload.name) === 'string' && reqData.payload.name.trim().length > 0 ? reqData.payload.name : false;
    var price = typeof (reqData.payload.price) === 'string' && !isNaN(parseInt(reqData.payload.price)) ? reqData.payload.price : false;
    var author = typeof (reqData.payload.author) === 'string' && reqData.payload.author.trim().length > 0 ? reqData.payload.author : false;
    var publisher = typeof (reqData.payload.publisher) === 'string' && reqData.payload.publisher.trim().length > 0 ? reqData.payload.publisher : false;
    if(name && price && author && publisher){
        fileUtil.create('books/books', reqData.payload, (err) => {
            if (!err) {
                callback(200, { message: "book added successfully", data: null });
            } else {
                callback(400, { message: "could not add book", err });
            }
        });
    }
};

exports.borrowBook = async (reqData, callback) => {
    fileUtil.borrow(reqData.payload.user, reqData.payload.book, (err, data) => {
        if(!err){
            callback(200, {  data })
        }else {
            callback(400, { message: "could not borrow book", err });
        }
    });
    
}
 
exports.returnBook = (reqData, callback) => {
    fileUtil.return(reqData.payload.user, reqData.payload.book, (err, data) => {
        if(!err){
            callback(200, {  data })
        }else {
            callback(400, { message: "could not return book", err });
        }
    });
}

exports.getAllBooks =  getAll('books/books', 'books');

exports.getOneBook = getOne('books/books', 'book');

exports.updateBook = update('books/books', 'book')

exports.deleteBook = deleteOne('books/books', 'book')