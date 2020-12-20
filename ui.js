"use strict";
const React = require("react");
const importJsx = require('import-jsx');

const { useState, useEffect } = require("react");
const BigText = require("ink-big-text");
const { Text, Newline } = require("ink");
const { getAllBooks } = require('./service/booksService');

const MainMenu = importJsx('./components/MainMenu.js');
const BooksList = importJsx('./components/BooksList.js');
const BookDetails = importJsx('./components/BookDetails.js');

const App = () => {
	const [history, setHistory] = useState([]);
	const [mode, setMode] = useState('MAIN_MENU');
	const [books, setBooks] = useState([]);

	useEffect(() => {
		let books = getAllBooks();
		setBooks(books);
	}, []);

	const handleViewBook = (item) => {
		console.log(item);
	} 

	const handleMainMenu = (item) => {
		switch(item.value){
			case 'VIEW':
				const booksList = books.map(book => (
					{
						label: `${book.title}`,
						value: book.id
					}
				))

				let currentHistory = [...history];
				currentHistory.push(<Newline />);
				currentHistory.push(<Text color="yellow">Choose one of the following actions</Text>);
				currentHistory.push(<MainMenu items={booksList} inHistory={true} selectedValue={item.value} />);
				setHistory(currentHistory);
				setMode('BOOKS_LIST_VIEW');
				break;
			
			case 'ADD':
				console.log('add');
				break;

			case 'EDIT':
				console.log('edit');
				break;

			case 'SEARCH':
				console.log("search");
				break;

			default:
				console.log("exit")
				break;	
		}
	};

	const Content = () => {
		switch(mode) {
			case 'MAIN_MENU':
				return <React.Fragment>
					<Text color="yellow">Choose one of the following actions</Text>
					<MainMenu onSelect={handleMainMenu} />
				</React.Fragment>

			case 'BOOKS_LIST_VIEW':
				return <React.Fragment>
					<Text color="yellow">Choose a book to view</Text>
					<BooksList items={booksList} onSelect={(item) => console.log(item)} />
				</React.Fragment>

			default:
				console.log("here")
				return null;
		}
	}

	return (
		<React.Fragment>
			{/* <BigText text="BOOKS MANAGER" /> */}
			{history.map(Action => Action)}
			<Content />
		</React.Fragment>
	);
};

module.exports = App;
