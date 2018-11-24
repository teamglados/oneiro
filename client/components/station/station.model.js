import { takeEvery, put, select } from 'redux-saga/effects';
import { createDuck, createApiAction } from 'reducktion';
import { Image } from 'react-native';
import { addHours } from 'date-fns';

import mockStations from './mock-stations.json';
import navigation from '../../navigation/navigation.service';

const model = createDuck({
  name: 'station',
  inject: ['charging'],
  state: {
    nearbyStations: [],
    selectedStation: null,
    reservedStation: null,
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    fetchNearbyStations: createApiAction('nearbyStations'),
    selectStation: (state, action) => ({
      ...state,
      selectedStation: action.payload,
    }),
    clearSelectedStation: state => ({
      ...state,
      selectedStation: null,
    }),
    reserveSelectedStation: state => ({
      ...state,
      reservedStation: state.selectedStation,
    }),
  }),
  selectors: ({ name }) => ({
    getSelectedStationDetails: state => {
      const { nearbyStations, selectedStation } = state[name];
      return nearbyStations.find(x => x.id === selectedStation);
    },
    getReservedStationDetails: state => {
      const { nearbyStations, reservedStation } = state[name];
      return nearbyStations.find(x => x.id === reservedStation);
    },
  }),
  sagas: ({ types, deps }) => [
    takeEvery(types.fetchNearbyStations.loading, fetchNearbyStationsSaga),
    takeEvery(types.reserveSelectedStation, reserveSelectedStationSaga, deps),
  ],
});

// Saga handlers
function* fetchNearbyStationsSaga() {
  try {
    const stations = mockStations.map(s => ({
      ...s,
      endingTime: addHours(new Date(), 5),
    }));
    yield put(model.actions.fetchNearbyStations.success(stations));

    const preFetchImages = mockStations.map(({ imgUrl }) =>
      Image.prefetch(imgUrl)
    );

    Promise.all(preFetchImages);
  } catch (error) {
    yield put(model.actions.fetchNearbyStations.fail());
  }
}

function* reserveSelectedStationSaga(deps) {
  try {
    const selectedStation = yield select(model.selectors.getSelectedStation);
    console.log('Selected station', selectedStation);

    // TODO: do the reservation!

    // Update status
    yield put(deps.charging.actions.setChargingStatus('RESERVED'));
    yield put(deps.charging.actions.startReservationTimer());

    // Go to Charging tab
    navigation.navigate('ChargingStack');

    // Start polling for reservation status
    yield put(deps.charging.actions.startReservationPolling());

    // Cleanup
    yield put(model.actions.clearSelectedStation());
  } catch (error) {
    console.log('Failed to reserve station', error);
  }
}

export default model;
