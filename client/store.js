import { createStore, applyMiddleware, combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import { initDucks } from 'reducktion';

import station from './components/station/station.model';
import charging from './components/charging/charging.model';
import payment from './components/payment/payment.model';
import history from './components/history/history.model';

const ducks = initDucks([station, charging, payment, history]);
const rootReducer = combineReducers(ducks.allReducers);

// Start all sagas
function* rootSaga() {
  yield all(ducks.allSagas);
}

const sagaMiddleware = createSagaMiddleware();
// const enhancer = applyMiddleware(sagaMiddleware, logger);
const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
