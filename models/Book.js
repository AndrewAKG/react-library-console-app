const { v4: uuidv4 } = require('uuid');

class Book {
  constructor({ id = uuidv4(), title, author, description }){
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
  }
}

module.exports = Book;