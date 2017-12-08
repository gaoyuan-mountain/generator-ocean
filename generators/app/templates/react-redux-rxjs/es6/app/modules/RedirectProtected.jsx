import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class RedirectProtected extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Route
        render={(props) => (
          isAuthenticated ?
          (<this.props.component {...props} />) :
          (<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname, isAuthenticated }
            }}
          />)
        )}
      />
    );
  }
}

export default RedirectProtected;
