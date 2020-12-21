const React = require("react");
const { useState } = require("react");

const { Text, Box } = require("ink");
const { UncontrolledTextInput } = require('ink-text-input');

const AddBook = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [desc, setDesc] = useState("");

	return (
		<React.Fragment>
			<Text color="yellow">Add the following information:</Text>
			
      <Box>
				<Box marginRight={1}>
					<Text>Title:</Text>
				</Box>

				<UncontrolledTextInput onSubmit={text => console.log(text)}/>
			</Box>
      
      <Box>
				<Box marginRight={1}>
					<Text>Author:</Text>
				</Box>

				<UncontrolledTextInput onSubmit={text => console.log(text)}/>
			</Box>
      
      <Box>
				<Box marginRight={1}>
					<Text>Description:</Text>
				</Box>

				<UncontrolledTextInput onSubmit={text => console.log(text)} />
			</Box>

		</React.Fragment>
	);
};

module.exports = AddBook;
