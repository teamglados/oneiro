import { createStore, applyMiddleware, combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { initDucks } from 'reducktion';

import station from './components/station/station.model';
import charging from './components/charging/charging.model';

const ducks = initDucks([station, charging]);
const rootReducer = combineReducers(ducks.allReducers);

// Start all sagas
function* rootSaga() {
  yield all(ducks.allSagas);
}

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, logger);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
