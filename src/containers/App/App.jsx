import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Rendered!
        </h3>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.object]).isRequired
};
