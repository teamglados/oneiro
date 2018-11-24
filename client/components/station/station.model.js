import { takeEvery, put } from 'redux-saga/effects';
import { createDuck, createApiAction } from 'reducktion';
import { Image } from 'react-native';

import mockStations from './mock-stations.json';
import { sleep } from '../../helpers/utils';

const model = createDuck({
  name: 'station',
  state: {
    nearbyStations: [],
    selectedStation: null,
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
  }),
  selectors: ({ name }) => ({
    getStationDetails: state => {
      const { nearbyStations, selectedStation } = state[name];
      return nearbyStations.find(x => x.id === selectedStation);
    },
  }),
  sagas: ({ types }) => [
    takeEvery(types.fetchNearbyStations.loading, fetchNearbyStationsSaga),
  ],
});

// Saga handlers
function* fetchNearbyStationsSaga() {
  try {
    console.log('> foo');
    yield put(model.actions.fetchNearbyStations.success(mockStations));

    const preFetchImages = mockStations.map(({ imgUrl }) =>
      Image.prefetch(imgUrl)
    );

    Promise.all(preFetchImages);
  } catch (error) {
    yield put(model.actions.fetchNearbyStations.fail());
  }
}

export default model;
