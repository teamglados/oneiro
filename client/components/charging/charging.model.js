import { takeEvery, put } from 'redux-saga/effects';
import { createDuck, createApiAction } from 'reducktion';

import { sleep } from '../../helpers/utils';

const model = createDuck({
  name: 'charging',
  state: {
    chargePercentage: null,
    chargeStatus: 'NON_ACTIVE',
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    fetchOrders: createApiAction('orders'),
    // Provide custom success reducer handler
    fetchPackages: createApiAction({
      success: (state, action) => ({
        ...state,
        packages: action.payload,
        hasError: null,
        isLoading: false,
      }),
    }),
  }),
  selectors: ({ name }) => ({
    getCustomSelector: state => [...state[name].orders, 'lol'],
    getOrders: state => state[name].orders,
  }),
  sagas: ({ types }) => [takeEvery([types.fetchOrders], fetchOrdersSaga)],
});

// Saga handlers
function* fetchOrdersSaga() {
  try {
    // Fake API call delay
    yield sleep(400);
    // this.props.fetchOrders()
    yield put(
      model.actions.fetchOrders.success([
        { id: 1, name: 'Mock charging 1' },
        { id: 2, name: 'Mock charging 2' },
        { id: 3, name: 'Mock charging 3' },
        { id: 4, name: 'Mock charging 4' },
      ])
    );
  } catch (error) {
    yield put(model.actions.fetchOrders.fail());
  }
}

export default model;
