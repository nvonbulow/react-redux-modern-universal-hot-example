import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { App } from 'containers';
import routes from 'routes';

export default class Root extends React.Component {
  render() {
    const { store, history, Router } = this.props;
    return (
      <Provider store={store} key="provider">
        <Router history={history}>
          <App>
            { routes }
          </App>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  Router: PropTypes.func.isRequired
};
