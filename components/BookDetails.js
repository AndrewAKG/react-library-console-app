const React = require('react');
const { Text } = require('ink');

const BookDetails = ({ book }) => {
  return <React.Fragment>
    <Text color="cyan">Book Details</Text>
    <Text>ID: {book.id}</Text>
    <Text>Title: {book.title}</Text>
    <Text>Author: {book.author}</Text>
    <Text>Description: {book.description}</Text>
  </React.Fragment>
}

module.exports = BookDetails;