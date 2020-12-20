'use strict';

const fs = require('fs'); 

const getAllBooks = () => {
  let rawdata = fs.readFileSync('books.json');
  let booksFile = JSON.parse(rawdata);
  return booksFile.books;
}

const addBook = () => {

}

const editBook = () => {

}

module.exports = {
  getAllBooks
}