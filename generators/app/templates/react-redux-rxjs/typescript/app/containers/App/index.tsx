import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Router from '../../modules/ReduxRouter';
import RedirectPublic from '../../modules/RedirectPublic';
import RedirectProtected from '../../modules/RedirectProtected';

import Task from '../../containers/Task';
import Login from '../../containers/Login';
import NotFound from '../../containers/NotFound';

import Loader from '../../components/Loader';

import '../../styles/style.less';
import './style.less';

interface AppProps {
  app;
  dispatch;
  user;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const { app, dispatch, user } = this.props;
    const html = (
      <Router dispatch={dispatch}>
        <div key="app" className="app">
          <main className="app-main">
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/login" />)} />
              <RedirectPublic
                component={Login}
                isAuthenticated={user.isAuthenticated}
                path="/login"
                exact
              />
              <RedirectProtected
                component={Task}
                isAuthenticated={user.isAuthenticated}
                path="/task"
                exact
              />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    );

    return html;
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user
  };
}

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(App);
