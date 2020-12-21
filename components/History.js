const React = require('react');


/**
 * History Json structure
 * {
 *    type: select | view | add | edit | search |
 *    title: action title
 *    options: select options if type is select || []
 *    
 * }
 *  
 */
const History = ({ history }) => {
  return <React.Fragment>
    {
      history.map(event => event)
    }
  </React.Fragment>
}

module.exports = React.memo(History);