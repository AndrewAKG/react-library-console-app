const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");
const { Text } = require("ink");

const Title = importJsx("../elements/Title.js");
const TextInput = importJsx("../elements/TextInput.js");

const { TITLE_COLOR } = require("../constants/Colors");
const { EDIT_TITLE } = require("../constants/Phrases");

const EditBook = ({ onSubmit, book }) => {
	const [title, setTitle] = useState(book ? book.title : "");
	const [author, setAuthor] = useState(book ? book.author : "");
	const [desc, setDesc] = useState(book ? book.description : "");

	const [showTitle, setShowTitle] = useState(true);
	const [showAuthor, setShowAuthor] = useState(false);
	const [showDesc, setShowDesc] = useState(false);

	return (
		<React.Fragment>
			<Title color={TITLE_COLOR} text={EDIT_TITLE} />
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
					text={'Description'}
					value={desc}
					onChange={setDesc}
					onSubmit={(text) => {
						if (!text) {
							return;
						}
						setShowDesc(false);
						let changed =
							title !== book.title ||
							author !== book.author ||
							desc !== book.description;
						onSubmit({
							id: book.id,
							title,
							author,
							description: desc,
							changed,
						});
					}}
				/>
			)}
		</React.Fragment>
	);
};

module.exports = EditBook;
