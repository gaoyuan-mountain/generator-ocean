import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSagas from 'sagas';
import rootReducer from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({ ...rootReducer });

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSagas);

  return store;
};
