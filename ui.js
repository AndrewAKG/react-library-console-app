"use strict";
const React = require("react");
const importJsx = require("import-jsx");

const { useState, useEffect } = require("react");
const BigText = require("ink-big-text");
const { Text, Newline, useApp } = require("ink");
const { getAllBooks } = require("./service/booksService");

const MainMenu = importJsx("./components/MainMenu.js");
const BooksList = importJsx("./components/BooksList.js");
const BookDetails = importJsx("./components/BookDetails.js");
const History = importJsx("./components/History.js");

const App = () => {
	const {exit} = useApp();
	const [history, setHistory] = useState([]);
	const [mode, setMode] = useState("MAIN_MENU");
	const [books, setBooks] = useState([]);
	const [booksList, setBooksList] = useState([]);
	const [chosenBook, setChosenBook] = useState(null);

	useEffect(() => {
		let books = getAllBooks();
		setBooks(books);
	}, []);

	const handleViewBook = (item) => {
		// add to history
		let currentHistory = [...history];
		currentHistory.push(
			<Text color="cyan">Choose a book to view or return to main menu</Text>
		);
		currentHistory.push(
			<BooksList
				items={booksList}
				inHistory={true}
				selectedValue={item.value}
			/>
		);
		currentHistory.push(<Newline />);

		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);

			// add to history
			currentHistory.push(<BookDetails book={chosenBook[0]} />);
			currentHistory.push(<Newline />);
		}

		setHistory(currentHistory);

		// adjust ui
		if (item.value === -1) {
			setMode("MAIN_MENU");
		} else {
			setMode("BOOK_DETAILS_VIEW");
		}
	};

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
				currentHistory.push(
					<Text color="cyan">Choose one of the following actions</Text>
				);
				currentHistory.push(
					<MainMenu
						items={booksList}
						inHistory={true}
						selectedValue={item.value}
					/>
				);
				currentHistory.push(<Newline />);
				setHistory(currentHistory);
				setMode("BOOKS_LIST_VIEW");
				break;

			case "ADD":
				console.log("add");
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

	const Content = () => {
		switch (mode) {
			case "MAIN_MENU":
				return (
					<React.Fragment>
						<Text color="yellow">Choose one of the following actions</Text>
						<MainMenu onSelect={handleMainMenu} />
					</React.Fragment>
				);

			case "BOOKS_LIST_VIEW":
			case "BOOK_DETAILS_VIEW":
				return (
					<React.Fragment>
						<Text color="yellow">
							Choose a book to view or return to main menu
						</Text>
						<BooksList items={booksList} onSelect={handleViewBook} />
					</React.Fragment>
				);

			default:
				console.log("here");
				return null;
		}
	};

	return (
		<React.Fragment>
			{/* <BigText text="BOOKS MANAGER" /> */}
			<History history={history} />
			<Content />
		</React.Fragment>
	);
};

module.exports = App;
