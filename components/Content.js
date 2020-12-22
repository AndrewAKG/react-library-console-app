"use strict";
// libraries imports
const React = require("react");
const importJsx = require("import-jsx");
const { useApp } = require("ink");
const { useState, useEffect, useContext } = require("react");
const uuid = require("react-uuid");

// history context import
const HistoryContext = require("../state/History");

// components import
const MainMenu = importJsx("./MainMenu.js");
const BooksList = importJsx("./BooksList.js");
const AddBook = importJsx("./AddBook.js");
const EditBook = importJsx("./EditBook");
const SearchForBook = importJsx("./SearchForBook.js");

// service import
const {
	getAllBooks,
	addBook,
	editBook,
	searchForBook,
} = require("../service/booksService");

// constants import
const {
	MAIN_TITLE,
	LIST_VIEW_TITLE,
	LIST_EDIT_TITLE,
	SEARCH_TITLE
} = require("../constants/Phrases");
const mainChoices = require("../constants/mainChoices");

// model import
const BookListItem = require("../models/BookListItem");

const Content = () => {
	const { exit } = useApp();

	// using history context
	const { setHistory: updateHistory } = useContext(HistoryContext);

	// mode for handling UI change
	const [mode, setMode] = useState("MAIN_MENU");

	// books (Book Structure), booksList (BookListItem Structure)
	const [booksList, setBooksList] = useState([]);
	const [books, setBooks] = useState([]);

	const [chosenBook, setChosenBook] = useState(null);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		// get all books from json file
		let books = getAllBooks();
		setBooks(books);
	}, []);

	// update booksList with BookListItem Structure
	const updateBooksList = (newBooks) => {
		const newBooksList = newBooks.map(book => new BookListItem(book));

		newBooksList.push({
			label: "back to main menu",
			value: -1,
		});

		setBooksList(newBooksList);
	};

	// handles use choose a book to view scenario
	const handleViewBook = (item) => {
		// add to history
		updateHistory({
			id: uuid(),
			type: "select",
			title: LIST_VIEW_TITLE,
			options: booksList,
			selectedValue: item.value,
		});

		// he didn't choose back to main menu
		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);

			// displat details in history
			updateHistory({
				id: uuid(),
				type: "details_view",
				item: chosenBook[0],
			});
		}

		// adjust ui if choose back to main menu
		if (item.value === -1) {
			setMode("MAIN_MENU");
		}
	};

	// handles use choose add book scenario
	const handleAddBook = (addedBook) => {
		// save book to json
		let newBook = addBook(addedBook);

		// update books in state
		let newBooks = [...books];
		newBooks.push(newBook);
		setBooks(newBooks);

		// add history event
		updateHistory({
			id: uuid(),
			type: "info",
			title: "saved.",
			item: newBook,
		});

		// adjust UI
		setMode("MAIN_MENU");
	};

	// handles use choose a book to edit scenario
	const handleViewBookEditMode = (item) => {
		// add history event
		updateHistory({
			id: uuid(),
			type: "select",
			title: LIST_EDIT_TITLE,
			options: booksList,
			selectedValue: item.value,
		});

		// user didn't choose back to main menu
		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);
			setChosenBook(chosenBook[0] ? chosenBook[0] : {});
		}

		// if user choose back to main menu - adjust UI
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
				id: uuid(),
				type: "info",
				title: "edited successfully.",
				item: editedBook,
			});

			updateBooksList(newBooks);
		}
		setMode("BOOKS_LIST_VIEW");
	};

	const handleSearchForBook = (searchKey) => {
		updateHistory({
			id: uuid(),
			type: "search",
			title: SEARCH_TITLE,
			searchKey,
		});

		let searchResults = searchForBook(searchKey);
		updateBooksList(searchResults);
		setMode("BOOKS_LIST_VIEW");
	};

	const handleMainMenu = (item) => {
		updateHistory({
			id: uuid(),
			type: "select",
			title: MAIN_TITLE,
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
				setMode("SEARCH_FOR_BOOK");
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

		case "SEARCH_FOR_BOOK":
			return <SearchForBook onSubmit={handleSearchForBook} />

		default:
			return null;
	}
};

module.exports = React.memo(Content);
