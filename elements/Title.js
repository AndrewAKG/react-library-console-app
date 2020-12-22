const React = require("react");
const { Text } = require("ink");

const Title = ({ text, color }) => {
  return <Text color={color}>{text}</Text>
}

module.exports = Title;