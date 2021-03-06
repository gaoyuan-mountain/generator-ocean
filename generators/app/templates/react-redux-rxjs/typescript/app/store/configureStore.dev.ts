import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import rootEpic from '../epics';
import rootReducer from '../reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const reducer = combineReducers({ ...rootReducer });

const logger = createLogger({
  collapsed: true
});

const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, epicMiddleware, logger)
  )(createStore);

  const store = createStoreWithMiddleware(
    reducer,
    initialState
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });

    module.hot.accept('../epics', () => {
      epicMiddleware.replaceEpic(require('../epics').default);
    });
  }

  return store;
};

export default configStore;
