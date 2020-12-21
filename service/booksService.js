"use strict";

const fs = require("fs");
const Book = require("../models/Book");

let books = [];

const getAllBooks = () => {
	try {
		let rawdata = fs.readFileSync("books.json");
		let booksFile = JSON.parse(rawdata);
		books = booksFile.books;
		return books;
	} catch (e) {
		return [];
	}
};

const addBook = (title, author, desc) => {
	let newBook = new Book(title, author, desc);
	// update existing aray
	books.push(newBook);

	// save to json
	let data = JSON.stringify({ books }, null, 2);

	try {
		fs.writeFile("books.json", data, (err) => {
			if (err) throw err;
		});
	} catch (e) {}

	return newBook;
};

const editBook = () => {};

module.exports = {
	getAllBooks,
	addBook,
	editBook,
};
