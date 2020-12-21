"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const uuid = require('react-uuid');
const { Text, Newline, useApp } = require("ink");
const { useState, useEffect } = require("react");

const MainMenu = importJsx("./MainMenu.js");
const BooksList = importJsx("./BooksList.js");
const BookDetails = importJsx("./BookDetails.js");

const { getAllBooks } = require("../service/booksService");

const Content = ({ setHistory, history }) => {
  const {exit} = useApp();
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
		currentHistory.push(
			<Text key={uuid()} color="cyan">Choose a book to view or return to main menu</Text>
		);
		currentHistory.push(
			<BooksList
				key={uuid()}
				items={booksList}
				inHistory={true}
				selectedValue={item.value}
			/>
		);
		currentHistory.push(<Newline key={uuid()}/>);

		if (item.value !== -1) {
			let bookId = item.value;
			let chosenBook = books.filter((book) => book.id === bookId);

			// add to history
			currentHistory.push(<BookDetails book={chosenBook[0]} key={uuid()} />);
			currentHistory.push(<Newline key={uuid()} />);
		}

		setHistory(currentHistory);

		// adjust ui
		if (item.value === -1) {
			setMode("MAIN_MENU");
		} else {
			setMode("BOOKS_LIST_VIEW");
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
					<Text key={uuid()} color="cyan">Choose one of the following actions</Text>
				);
				currentHistory.push(
					<MainMenu
						key={uuid()}
						items={booksList}
						inHistory={true}
						selectedValue={item.value}
					/>
				);
				currentHistory.push(<Newline key={uuid()} />);
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

  switch (mode) {
    case "MAIN_MENU":
      return (
        <React.Fragment>
          <Text color="yellow">Choose one of the following actions</Text>
          <MainMenu onSelect={handleMainMenu} />
        </React.Fragment>
      );

    case "BOOKS_LIST_VIEW":
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

module.exports = Content;