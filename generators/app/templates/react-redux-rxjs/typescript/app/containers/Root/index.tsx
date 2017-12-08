import * as React from 'react';
import { Provider } from 'react-redux';
import App from '../../containers/App';

interface RootProps {
  store;
}

export default class Root extends React.Component<RootProps, {}> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
