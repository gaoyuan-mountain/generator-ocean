import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface RedirectProtectedProps {
  component;
  isAuthenticated: boolean;
  path?;
  exact?;
}

class RedirectProtected extends React.Component<RedirectProtectedProps, {}> {
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
