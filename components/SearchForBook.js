const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");

const Title = importJsx("../elements/Title.js");
const Error = importJsx("../elements/Error.js");
const TextInput = importJsx("../elements/TextInput.js");

const { TITLE_COLOR } = require("../constants/Colors");
const { SEARCH_TITLE } = require("../constants/Phrases");

const SearchForBook = ({ onSubmit }) => {
	const [query, setQuery] = useState("");
	const [error, setError] = useState(false);

	return (
		<React.Fragment>
			<Title color={TITLE_COLOR} text={SEARCH_TITLE} />
			<TextInput
				text={"Search"}
				value={query}
				onChange={(text) => {
					setQuery(text);
					if (error && text && text.length >= 3) {
						setError(false);
					}
				}}
				onSubmit={(text) => {
					if (!text || text.length < 3) {
						setError(true);
						return;
					}
					onSubmit(query);
				}}
			/>
			{error && <Error text={"please enter at least 3 characters to search"} />}
		</React.Fragment>
	);
};

module.exports = SearchForBook;
