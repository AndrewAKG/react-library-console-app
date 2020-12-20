const React = require("react");
const { Text } = require("ink");
const SelectInput = require("ink-select-input").default;

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
	}
];

const MainMenu = ({ onSelect, inHistory = false, selectedValue }) => {
  return !inHistory ? 
  <SelectInput items={choices} onSelect={onSelect} /> 
  : 
  <div>
    {choices.map(item => <Text color={item.value === selectedValue? "green": "gray"}>{item.label}</Text>)}
  </div>
}

module.exports = MainMenu;