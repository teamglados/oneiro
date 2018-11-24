import { takeEvery, put } from 'redux-saga/effects';
import { createDuck, createApiAction } from 'reducktion';

import { sleep } from '../../helpers/utils';

const duck = createDuck({
  name: 'order',
  state: {
    orders: [],
    packages: [],
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    // Simple way to create API related action
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
      duck.actions.fetchOrders.success([
        { id: 1, name: 'Mock order 1' },
        { id: 2, name: 'Mock order 2' },
        { id: 3, name: 'Mock order 3' },
        { id: 4, name: 'Mock order 4' },
      ])
    );
  } catch (error) {
    yield put(duck.actions.fetchOrders.fail());
  }
}

export default duck;