const React = require('react');
const importJsx = require("import-jsx");
const { Text } = require('ink');
const Title = importJsx("../elements/Title.js");

const { HISTORY_TITLE } = require("../constants/Colors");

const BookDetails = ({ book }) => {
  return <React.Fragment>
    <Title color={HISTORY_TITLE} text={'Book Details'} />
    <Text>ID: {book.id}</Text>
    <Text>Title: {book.title}</Text>
    <Text>Author: {book.author}</Text>
    <Text>Description: {book.description}</Text>
  </React.Fragment>
}

module.exports = BookDetails;