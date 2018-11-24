import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import paymentModel from './payment.model';
import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Button from '../common/Button';

class ReceiptModal extends Component {
  static propTypes = {
    receipt: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      chargeTime: PropTypes.number.isRequired,
    }),
    receiptModalVisible: PropTypes.bool.isRequired,
    closePaymentReceiptModal: PropTypes.func.isRequired,
  };

  render() {
    const { receipt, receiptModalVisible } = this.props;

    return (
      <Modal isVisible={receiptModalVisible} useNativeDriver>
        {receipt ? (
          <Body>
            <Text>{receipt.total}</Text>
            <Gutter vertical />
            <Button onPress={() => this.props.closePaymentReceiptModal()}>
              <Text>Close</Text>
            </Button>
          </Body>
        ) : (
          <View />
        )}
      </Modal>
    );
  }
}

const Body = styled.View`
  background-color: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const mapStateToProps = state => ({
  receipt: paymentModel.selectors.getReceipt(state),
  receiptModalVisible: paymentModel.selectors.getReceiptModalVisible(state),
});

const mapDispatchToProps = {
  closePaymentReceiptModal: paymentModel.actions.closePaymentReceiptModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptModal);
