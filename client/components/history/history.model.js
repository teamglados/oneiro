import { createDuck, createApiAction } from 'reducktion';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as api from '../../helpers/api';

const model = createDuck({
  name: 'history',
  state: {
    items: [],
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    fetchHistory: createApiAction('items'),
  }),
  sagas: ({ types }) => [
    takeLatest(types.fetchHistory.loading, fetchHistorySaga),
  ],
});

function* fetchHistorySaga() {
  try {
    const items = yield call(api.fetchHistory);
    yield put(model.actions.fetchHistory.success(items));
  } catch (error) {
    console.log('> Failed to fetch history items', error);
  }
}

export default model;
