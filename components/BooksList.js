const React = require("react");
const { Text } = require("ink");
const SelectInput = require("ink-select-input").default;

const BooksList = ({ items, onSelect, inHistory = false, selectedValue }) => {
  return !inHistory ? 
  <SelectInput items={items} onSelect={onSelect} /> 
  : 
  <React.Fragment>
    {items.map((item, index) => <Text key={index} color={item.value === selectedValue? "green": "gray"}>{item.label}</Text>)}
  </React.Fragment>
}

module.exports = BooksList;