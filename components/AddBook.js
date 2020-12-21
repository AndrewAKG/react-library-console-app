const React = require("react");
const { useState } = require("react");

const { Text, Box } = require("ink");
const TextInput = require("ink-text-input").default;

const AddBook = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [desc, setDesc] = useState("");

	const [showTitle, setShowTitle] = useState(true);
	const [showAuthor, setShowAuthor] = useState(false);
	const [showDesc, setShowDesc] = useState(false);

	return (
		<React.Fragment>
			<Text color="yellow">Enter the following information:</Text>
			{(showAuthor || showDesc) && <Text>Title: {title}</Text>}
			{showDesc && <Text>Author: {author}</Text>}
			{showTitle && (
				<Box>
					<Box marginRight={1}>
						<Text>Title:</Text>
					</Box>

					<TextInput value={title} onChange={setTitle} onSubmit={(text) => {
						if(!text){
							return;
						}
						setShowTitle(false);
						setShowAuthor(true);
					}} />
				</Box>
			)}
			{showAuthor && (
				<Box>
					<Box marginRight={1}>
						<Text>Author:</Text>
					</Box>

					<TextInput value={author} onChange={setAuthor} onSubmit={(text) => {
						if(!text){
							return;
						}
						setShowAuthor(false);
						setShowDesc(true);
					}} />
				</Box>
			)}
			{showDesc && (
				<Box>
					<Box marginRight={1}>
						<Text>Description:</Text>
					</Box>

					<TextInput value={desc} onChange={setDesc} onSubmit={(text) => {
						if(!text){
							return;
						}
						setShowDesc(false);
						onSubmit(title, author, desc);
					}} />
				</Box>
			)}
		</React.Fragment>
	);
};

module.exports = AddBook;
