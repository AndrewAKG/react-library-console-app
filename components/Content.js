"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { useApp } = require("ink");
const { useState, useEffect } = require("react");

const MainMenu = importJsx("./MainMenu.js");
const BooksList = importJsx("./BooksList.js");
const AddBook = importJsx("./AddBook.js");
const EditBook = importJsx("./EditBook");

const { getAllBooks, addBook, editBook } = require("../service/booksService");

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
	const [chosenBook, setChosenBook] = useState(null);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		let books = getAllBooks();
		setBooks(books);
	}, []);

	const updateHistory = (newEvent) => {
		let currentHistory = [...history];
		currentHistory.push(newEvent);
		setHistory(currentHistory);
	};

	const updateBooksList = (newBooks) => {
		const newBooksList = newBooks.map((book) => ({
			label: `${book.title}`,
			value: book.id,
		}));

		newBooksList.push({
			label: "back to main menu",
			value: -1,
		});

		setBooksList(newBooksList);
	};

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

	const handleAddBook = (addedBook) => {
		let newBook = addBook(addedBook);
		let newBooks = [...books];
		newBooks.push(newBook);
		setBooks(newBooks);

		updateHistory({
			type: "info",
			title: "saved.",
			item: newBook,
		});
		setMode("MAIN_MENU");
	};

	const handleViewBookEditMode = (item) => {
		// add to history
		updateHistory({
			type: "select",
			title: "Choose a book to edit or return to main menu",
			options: booksList,
			selectedValue: item.value,
		});

		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);
			setChosenBook(chosenBook[0] ? chosenBook[0] : {});
		}

		// adjust ui
		if (item.value === -1) {
			setMode("MAIN_MENU");
			setEditMode(false);
			setChosenBook(null);
		} else {
			setMode("EDIT_BOOK");
		}
	};

	const handleEditBook = (newBook) => {
		if (newBook.changed) {
			let editedBook = editBook(newBook);
			let bookIndex = books.findIndex((book) => book.id === newBook.id);

			let newBooks = [...books];
			if (bookIndex !== -1) {
				newBooks[bookIndex] = editedBook;
				setBooks(newBooks);
			}

			updateHistory({
				type: "info",
				title: "edited successfully.",
				item: editedBook,
			});

			updateBooksList(newBooks);
		}
		setMode("BOOKS_LIST_VIEW");
	};

	const handleMainMenu = (item) => {
		updateHistory({
			type: "select",
			title: "Choose one of the following actions",
			options: mainChoices,
			selectedValue: item.value,
		});

		switch (item.value) {
			case "VIEW":
			case "EDIT":
				if (item.value === "EDIT") {
					setEditMode(true);
				}

				updateBooksList(books);
				setMode("BOOKS_LIST_VIEW");
				break;

			case "ADD":
				setMode("ADD_BOOK");
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
			return (
				<BooksList
					items={booksList}
					edit={editMode}
					onSelect={editMode ? handleViewBookEditMode : handleViewBook}
				/>
			);

		case "ADD_BOOK":
			return <AddBook onSubmit={handleAddBook} />;

		case "EDIT_BOOK":
			return <EditBook book={chosenBook} onSubmit={handleEditBook} />;

		default:
			return null;
	}
};

module.exports = Content;
