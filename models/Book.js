const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title, author, description){
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.description = description;
  }
}

module.exports = Book;