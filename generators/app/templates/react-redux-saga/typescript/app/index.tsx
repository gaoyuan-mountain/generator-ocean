import 'core-js/shim';
import 'classlist-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import store from './store';
import './styles/style.less';

export function renderApp(RootComponent) {
  const target = document.querySelector('#root');
  if (target) {
    ReactDOM.render(
      <AppContainer>
        <RootComponent store={store} />
      </AppContainer>,
      target
    );
  }
}

renderApp(Root);

if (module.hot) {
  module.hot.accept(
    './containers/Root',
    () => renderApp(require('./containers/Root'))
  );
}
