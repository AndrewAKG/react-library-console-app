const React = require("react");
const { Text } = require("ink");
const { ERROR_COLOR } = require("../constants/Colors");

const Error = ({ text }) => {
  return <Text color={ERROR_COLOR}>{text}</Text>
}

module.exports = Error;