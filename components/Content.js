"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { useApp } = require("ink");
const { useState, useEffect } = require("react");

const MainMenu = importJsx("./MainMenu.js");
const BooksList = importJsx("./BooksList.js");
const AddBook = importJsx("./AddBook.js");

const { getAllBooks } = require("../service/booksService");

const mainChoices = [
	{
		label: "View all books",
		value: "VIEW",
	},
	{
		label: "Add a book",
		value: "ADD",
	},
	{
		label: "Edit a book",
		value: "EDIT",
	},
	{
		label: "Search for a book",
		value: "SEARCH",
	},
	{
		label: "Save and exit",
		value: "EXIT",
	},
];

const Content = ({ setHistory, history }) => {
	const { exit } = useApp();
	const [mode, setMode] = useState("MAIN_MENU");
	const [booksList, setBooksList] = useState([]);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		let books = getAllBooks();
		setBooks(books);
	}, []);

	const handleViewBook = (item) => {
		// add to history
		let currentHistory = [...history];
		currentHistory.push({
			type: "select",
			title: "Choose a book to view or return to main menu",
			options: booksList,
			selectedValue: item.value,
		});

		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);

			// add to history
			currentHistory.push({
				type: "details_view",
				item: chosenBook[0],
			});
		}

		setHistory(currentHistory);

		// adjust ui
		if (item.value === -1) {
			setMode("MAIN_MENU");
		} else {
			setMode("BOOKS_LIST_VIEW");
		}
  };
  
  const handleAddBook = (title, author, desc) => {
    console.log(title, author, desc);
  }

	const handleMainMenu = (item) => {
		switch (item.value) {
			case "VIEW":
				const newBooksList = books.map((book) => ({
					label: `${book.title}`,
					value: book.id,
				}));

				newBooksList.push({
					label: "back to main menu",
					value: -1,
				});

				setBooksList(newBooksList);

				let currentHistory = [...history];
				currentHistory.push({
					type: "select",
					title: "Choose one of the following actions",
					options: mainChoices,
					selectedValue: item.value,
				});
				setHistory(currentHistory);
				setMode("BOOKS_LIST_VIEW");
				break;

			case "ADD":
				setMode("ADD_BOOK");
				break;

			case "EDIT":
				console.log("edit");
				break;

			case "SEARCH":
				console.log("search");
				break;

			default:
				exit();
		}
	};

	switch (mode) {
		case "MAIN_MENU":
			return <MainMenu onSelect={handleMainMenu} />;

		case "BOOKS_LIST_VIEW":
			return <BooksList items={booksList} onSelect={handleViewBook} />;
      
    case "ADD_BOOK":
      return <AddBook onSubmit={handleAddBook} />;

		default:
			console.log("here");
			return null;
	}
};

module.exports = Content;
