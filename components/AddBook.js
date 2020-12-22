const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Text } = require("ink");

const Title = importJsx("../elements/Title.js");
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

	return (
		<React.Fragment>
			<Title text={ADD_BOOK_TITLE} color={TITLE_COLOR} />
			{(showAuthor || showDesc) && <Text>Title: {title}</Text>}
			{showDesc && <Text>Author: {author}</Text>}
			{showTitle && (
				<TextInput
					text={"Title"}
					value={title}
					onChange={setTitle}
					onSubmit={(text) => {
						if (!text) {
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
					onChange={setAuthor}
					onSubmit={(text) => {
						if (!text) {
							return;
						}
						setShowAuthor(false);
						setShowDesc(true);
					}}
				/>
			)}
			{showDesc && (
				<TextInput
					text={"Description:"}
					value={desc}
					onChange={setDesc}
					onSubmit={(text) => {
						if (!text) {
							return;
						}
						setShowDesc(false);
						onSubmit({ title, author, desc });
					}}
				/>
			)}
		</React.Fragment>
	);
};

module.exports = AddBook;
