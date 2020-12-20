const React = require("react");
const { Text } = require("ink");
const SelectInput = require("ink-select-input").default;

const BooksList = ({ items, onSelect, inHistory = false, selectedValue }) => {
  return !inHistory ? 
  <SelectInput items={items} onSelect={onSelect} /> 
  : 
  <div>
    {items.map(item => <Text color={item.value === selectedValue? "green": "gray"}>{item.label}</Text>)}
  </div>
}

module.exports = BooksList;