const React = require("react");
const { useState } = require("react");

const { Text, Box } = require("ink");
const TextInput = require("ink-text-input").default;

const SearchForBook = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	return (
		<React.Fragment>
			<Text color="yellow">Type in one or more keywords to search for</Text>
				<Box>
					<Box marginRight={1}>
						<Text>Search:</Text>
					</Box>

					<TextInput
						value={query}
						onChange={setQuery}
						onSubmit={(text) => {
							if (!text) {
								return;
							}
							onSubmit(query);
						}}
					/>
				</Box>
		</React.Fragment>
	);
};

module.exports = SearchForBook;
