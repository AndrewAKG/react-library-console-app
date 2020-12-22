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

const addBook = ({ title, author, desc }) => {
	let newBook = new Book({ title, author, description: desc });

	// update existing books
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

const editBook = (editedBook) => {
	let bookIndex = books.findIndex((book) => book.id === editedBook.id);
	if (bookIndex !== -1) {
		delete editedBook.changed;
		books[bookIndex] = editedBook;

		// save to json
		let data = JSON.stringify({ books }, null, 2);

		try {
			fs.writeFile("books.json", data, (err) => {
				if (err) throw err;
			});
		} catch (e) {}
	}

	return editedBook;
};

module.exports = {
	getAllBooks,
	addBook,
	editBook,
};
