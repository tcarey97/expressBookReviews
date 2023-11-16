const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username) => {
    let usersWithSameName = users.filter((user) => username === user.username);
    if (usersWithSameName.length > 0){
        return true;
    } else {
        return false;
    }

}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(users);

  if (username && password){
       if (!doesExist(username)){
           users.push({"username":username, "password":password});
           return res.status(200).json({message: "User successfully registred. Now you can login"});
       } else {
           return res.status(404).json({message: "User already exists!"}); 
       }
  } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let foundResult = books[isbn];
  return res.status(300).json({message: foundResult});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let foundResult = Object.values(books).filter((result) => result.author === author);
  return res.status(300).json({message:foundResult});      
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let foundResult = Object.values(books).filter((result) => result.title === title);
    return res.status(300).json({message:foundResult}); 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbnIndex = req.params.isbn - 1;
  let booksArray = Object.values(books);
  let foundReview = booksArray[isbnIndex].reviews;
  return res.status(300).json({message: foundReview});
});

module.exports.general = public_users;
