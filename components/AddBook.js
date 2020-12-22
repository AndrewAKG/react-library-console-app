const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Text } = require("ink");

const Title = importJsx("../elements/Title.js");
const Error = importJsx("../elements/Error.js");
const TextInput = importJsx("../elements/TextInput.js");

const { TITLE_COLOR } = require("../constants/Colors");
const { ADD_BOOK_TITLE } = require("../constants/Phrases");

const AddBook = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [desc, setDesc] = useState("");

	const [showTitle, setShowTitle] = useState(true);
	const [showAuthor, setShowAuthor] = useState(false);
	const [showDesc, setShowDesc] = useState(false);

	const [error, setError] = useState(false);

	const validateInput = (text) => {
		if (!text || text.length < 3) {
			setError(true);
			return false;
		}
		return true;
	};

	return (
		<React.Fragment>
			<Title text={ADD_BOOK_TITLE} color={TITLE_COLOR} />
			{(showAuthor || showDesc) && <Text>Title: {title}</Text>}
			{showDesc && <Text>Author: {author}</Text>}
			{showTitle && (
				<TextInput
					text={"Title"}
					value={title}
					onChange={(text) => {
						setTitle(text);
						if (error && text && text.length >= 3) {
							setError(false);
						}
					}}
					onSubmit={(text) => {
						if (!validateInput(text)) {
							return;
						}
						setShowTitle(false);
						setShowAuthor(true);
					}}
				/>
			)}
			{showAuthor && (
				<TextInput
					text={"Author"}
					value={author}
					onChange={(text) => {
						setAuthor(text);
						if (error && text && text.length >= 3) {
							setError(false);
						}
					}}
					onSubmit={(text) => {
						if (!validateInput(text)) {
							return;
						}
						setShowAuthor(false);
						setShowDesc(true);
					}}
				/>
			)}
			{showDesc && (
				<TextInput
					text={"Description"}
					value={desc}
					onChange={(text) => {
						setDesc(text);
						if (error && text && text.length >= 3) {
							setError(false);
						}
					}}
					onSubmit={(text) => {
						if (!validateInput(text)) {
							return;
						}
						setShowDesc(false);
						onSubmit({ title, author, desc });
					}}
				/>
			)}
			{error && <Error text={"please enter at least 3 characters to submit"} />}
		</React.Fragment>
	);
};

module.exports = AddBook;
