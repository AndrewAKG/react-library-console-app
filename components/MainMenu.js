const React = require("react");
const SelectInput = require("ink-select-input").default;
const { Text } = require("ink");

const choices = [
	{
		label: "View all books",
		value: "VIEW",
	},
	{
		label: "Add a book",
		value: "ADD",
	},
	{
		label: "Edit a book",
		value: "EDIT",
	},
	{
		label: "Search for a book",
		value: "SEARCH",
	},
	{
		label: "Save and exit",
		value: "EXIT",
	},
];

const MainMenu = ({ onSelect }) => {
	return (
		<React.Fragment>
			<Text color="yellow">Choose one of the following actions</Text>
			<SelectInput items={choices} onSelect={onSelect} />
		</React.Fragment>
	);
};

module.exports = MainMenu;
