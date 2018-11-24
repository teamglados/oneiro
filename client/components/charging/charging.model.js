import { createDuck } from 'reducktion';

import {
  // takeEvery,
  put,
  fork,
  take,
  cancel,
  cancelled,
  call,
} from 'redux-saga/effects';

import { sleep } from '../../helpers/utils';
import * as api from '../../helpers/api';

const model = createDuck({
  name: 'charging',
  state: {
    chargingPercentage: null,
    chargingStatus: 'PENDING',
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    startReservationPolling: state => ({ ...state }),
    stopReservationPolling: state => ({ ...state }),
    startChargingPolling: state => ({ ...state }),
    stopChargingPolling: state => ({ ...state }),
    updateChargingPercentage: (state, action) => ({
      ...state,
      chargingPercentage: action.payload || 0,
    }),
    setChargingStatus: (state, action) => ({
      ...state,
      chargingStatus: action.payload || 'PENDING',
    }),
  }),
  sagas: ({ types }) => [watchPollReserveation(), watchPollCharging()],
});

// Saga handlers
function* reservationPolling() {
  yield call(sleep, 2000);
  try {
    while (true) {
      console.log('> Polling reservation status...');
      let reservation;
      let apiRequestOk = true;

      // Make sure poller does not die if API request fails
      try {
        reservation = yield call(api.fetchReservation);
      } catch (error) {
        console.log('> Reservation polling API request failed');
        apiRequestOk = false;
      }

      if (apiRequestOk && reservation) {
        const { status } = reservation;

        if (status === 'CHARGING') {
          yield put(model.actions.updateChargingPercentage(0));
          yield put(model.actions.setChargingStatus('CHARGING'));
          yield put(model.actions.startChargingPolling());
          yield put(model.actions.stopReservationPolling());
        } else if (status === 'PENDING') {
          // TODO: handle
        }
      }

      yield call(sleep, 1000); // 1 sec polling interval
    }
  } finally {
    if (yield cancelled()) console.log('> Reservation polling cancelled');
    console.log('> Reservation polling ended');
  }
}

function* chargingPolling() {
  yield call(sleep, 2000);
  try {
    while (true) {
      console.log('> Polling charging status...');
      let chargingData;
      let apiRequestOk = true;

      // Make sure poller does not die if API request fails
      try {
        chargingData = yield call(api.fetchCharging);
      } catch (error) {
        console.log('> Charging polling API request failed');
        apiRequestOk = false;
      }

      if (apiRequestOk && chargingData) {
        const { status, percentage } = chargingData;

        if (status === 'COMPLETE') {
          yield put(model.actions.updateChargingPercentage(100));
          yield put(model.actions.stopChargingPolling());
        } else {
          yield put(model.actions.updateChargingPercentage(percentage));
        }
      }

      yield call(sleep, 1000); // 1 sec polling interval
    }
  } finally {
    if (yield cancelled()) console.log('> Charging polling cancelled');
    console.log('> Charging polling ended');
  }
}

function* watchPollReserveation() {
  while (yield take(model.types.startReservationPolling)) {
    const pollForReservationTask = yield fork(reservationPolling);
    yield take(model.types.stopReservationPolling);
    yield cancel(pollForReservationTask);
  }
}

function* watchPollCharging() {
  while (yield take(model.types.startChargingPolling)) {
    const pollForChargingTask = yield fork(chargingPolling);
    yield take(model.types.stopChargingPolling);
    yield cancel(pollForChargingTask);
  }
}

export default model;
