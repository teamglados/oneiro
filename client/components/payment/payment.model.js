import { takeEvery } from 'redux-saga/effects';
import { createDuck } from 'reducktion';

import navigation from '../../navigation/navigation.service';

const model = createDuck({
  name: 'payment',
  state: {
    receipt: null,
    receiptModalVisible: false,
    error: undefined,
    hasError: false,
    isLoading: false,
  },
  actions: () => ({
    showPaymentReceiptModal: (state, action) => ({
      ...state,
      receipt: action.payload,
      receiptModalVisible: true,
    }),
    closePaymentReceiptModal: state => ({
      ...state,
      receipt: null,
      receiptModalVisible: false,
    }),
  }),
  sagas: ({ types }) => [
    takeEvery(types.closePaymentReceiptModal, closePaymentReceiptModalSaga),
  ],
});

// Saga handlers
function* closePaymentReceiptModalSaga() {
  try {
    yield console.log('> Closing receipt modal');
    navigation.navigate('HomeStack');
  } catch (error) {
    console.log('> Failed to close receipt modal', error);
  }
}

export default model;
