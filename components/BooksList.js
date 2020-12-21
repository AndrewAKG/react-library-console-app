const React = require("react");
const SelectInput = require("ink-select-input").default;
const { Text } = require("ink");

const BooksList = ({ items, onSelect, edit }) => {
	return (
		<React.Fragment>
			<Text color="yellow">{`Choose a book to ${edit? 'edit': 'view'} or return to main menu`}</Text>
			<SelectInput items={items} onSelect={onSelect} />
		</React.Fragment>
	);
};

module.exports = BooksList;
