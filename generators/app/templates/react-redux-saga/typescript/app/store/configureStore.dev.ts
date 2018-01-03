import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSagas from '../sagas';
import rootReducer from '../reducers';

const reducer = combineReducers({
  ...rootReducer
});
const sagaMiddleware = createSagaMiddleware();

const configStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, logger)
  )(createStore);

  const store = createStoreWithMiddleware(
    reducer,
    initialState
  );
  sagaMiddleware.run(rootSagas);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
};

export default configStore;
