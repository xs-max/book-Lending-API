# Book Lending API
Built using node.js

Made a few ajustments to the original code given.

Added the followin features;

1). A get all books, borrow book and retun book routes

2). create use, get all users, get one user, update and user routes 

## How to Use The API;


# BOOK ROUTES


CREATE BOOK: Send a post request with the book details as payload to the "/books" route.

GET ALL BOOKS: Send a get request to the "/books" route.

GET ONE BOOK: send a get request with the book's id as a query parameter  to "/books" route. E.g 127.0.0.1:8080/books?id=hdbdhbdh33837

UPDATE BOOK: send a put request with the book's id as a query parameter  and add the details to update as payload  to "/books" route. E.g 127.0.0.1:8080/books?id=hdbdhbdh33837

DELETE BOOK: send a delete request with the book's id as a query parameter of id to "/books" route. E.g 127.0.0.1:8080/books?id=hdbdhbdh33837

BORROW BOOK: send a put request with the action to perform as a query parameter  and add the book's id and user's id as payload  to "/books" route. E.g 127.0.0.1:8080/books?action=borrow payload: { "user": "hdhdduheu383", "book": "bdbdheueuy3ghfhd" }

RETURN BOOK: send a put request with the action to perform as a query parameter  and add the book's id and user's id as payload  to "/books" route. E.g 127.0.0.1:8080/books?action=return payload: { "user": "hdhdduheu383", "book": "bdbdheueuy3ghfhd" }

# USER ROUTES


CREATE USER: Send a post request with the user details as payload to the "/users" route.

GET ALL USERS: Send a get request to the "/users" route.

GET ONE USER: send a get request with the book's id as a query parameter  to "/users" route. E.g 127.0.0.1:8080/users?id=hdbdhbdh33837

UPDATE USER: send a put request with the book's id as a query parameter  and add the details to update as payload  to "/users" route. E.g 127.0.0.1:8080/users?id=hdbdhbdh33837

DELETE USER: send a delete request with the book's id as a query parameter of id to "/users" route. E.g 127.0.0.1:8080/users?id=hdbdhbdh33837

