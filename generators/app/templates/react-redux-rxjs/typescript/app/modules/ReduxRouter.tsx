import * as React from 'react';
import { autobind } from 'core-decorators';
import Router from 'react-router-dom/Router';
import history from '../modules/history';

import { ActionTypes } from '../constants/index';

interface ReduxRouterProps {
  children;
  dispatch;
}

class ReduxRouter extends React.Component<ReduxRouterProps, {}> {
  constructor(props: ReduxRouterProps) {
    super(props);
  }

  componentDidMount() {
    this['unsubscribe'] = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this['unsubscribe']();
  }

  @autobind
  handleLocationChange(location, action) {
    const { dispatch } = this.props;

    dispatch({
      type: ActionTypes.LOCATION_CHANGE,
      payload: {
        location,
        action
      },
    });
  }

  render() {
    const { children } = this.props;

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
}

export const { push, replace, go, goBack, goForward } = history;

export default ReduxRouter;
