import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class RedirectPublic extends React.PureComponent {
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
          (<Redirect to="/task" />) :
          (<this.props.component {...props} />)
        )}
      />
    );
  }
}

export default RedirectPublic;
