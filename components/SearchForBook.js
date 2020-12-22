const React = require("react");
const importJsx = require("import-jsx");
const { useState } = require("react");

const Title = importJsx("../elements/Title.js");
const TextInput = importJsx("../elements/TextInput.js");

const { TITLE_COLOR } = require("../constants/Colors");
const { SEARCH_TITLE } = require("../constants/Phrases");

const SearchForBook = ({ onSubmit }) => {
	const [query, setQuery] = useState("");

	return (
		<React.Fragment>
			<Title color={TITLE_COLOR} text={SEARCH_TITLE} />
			<TextInput
				text={'Search'}
				value={query}
				onChange={setQuery}
				onSubmit={(text) => {
					if (!text) {
						return;
					}
					onSubmit(query);
				}}
			/>
		</React.Fragment>
	);
};

module.exports = SearchForBook;
