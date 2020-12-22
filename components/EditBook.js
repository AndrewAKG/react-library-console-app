const React = require("react");
const { useState } = require("react");

const { Text, Box } = require("ink");
const TextInput = require("ink-text-input").default;

const EditBook = ({ onSubmit, book }) => {
	const [title, setTitle] = useState(book? book.title: "");
	const [author, setAuthor] = useState(book? book.author: "");
	const [desc, setDesc] = useState(book? book.description: "");

	const [showTitle, setShowTitle] = useState(true);
	const [showAuthor, setShowAuthor] = useState(false);
	const [showDesc, setShowDesc] = useState(false);

	return (
		<React.Fragment>
			<Text color="yellow">{`Input the following information. To leave a field unchanged, hit <Enter>`}</Text>
			{(showAuthor || showDesc) && <Text>Title: {title}</Text>}
			{showDesc && <Text>Author: {author}</Text>}
			{showTitle && (
				<Box>
					<Box marginRight={1}>
						<Text>Title: </Text>
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
						let changed = title !== book.title || author !== book.author || desc !== book.description; 
						onSubmit({ id: book.id, title, author, desc, changed });
					}} />
				</Box>
			)}
		</React.Fragment>
	);
};

module.exports = EditBook;
