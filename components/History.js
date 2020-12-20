const React = require('react');

const History = ({ history }) => {
  return <React.Fragment>
    {
      history.map(event => event)
    }
  </React.Fragment>
}

module.exports = History;