import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface RedirectPublicProps {
  component;
  isAuthenticated: boolean;
  path?;
  exact?;
}

class RedirectPublic extends React.Component<RedirectPublicProps, {}> {
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
