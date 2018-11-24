import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'expo';
import { format } from 'date-fns';

import paymentModel from './payment.model';
import theme from '../../constants/theme';
import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Flexer from '../common/Flexer';
import Button from '../common/Button';

class ReceiptModal extends Component {
  static propTypes = {
    receipt: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      totalCost: PropTypes.number.isRequired,
      parkingCost: PropTypes.number.isRequired,
      chargingCost: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
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
            <Header>
              <LogoWrapper>
                <Logo
                  source={require('../../assets/images/logo.png')}
                  resizeMode="contain"
                />
              </LogoWrapper>
            </Header>

            <Content>
              <Text bold size={24}>
                {receipt.address}
              </Text>
              <Gutter vertical amount={4} />
              <Text color={theme.greyDarkest} size={14}>
                {format(receipt.timestamp, 'DD.MM.YYYY')}
              </Text>

              <Gutter vertical amount={32} />

              <Text color={theme.greyDarkest} size={14} bold>
                SUMMARY
              </Text>

              <Gutter vertical amount={4} />

              <Summary>
                <Row>
                  <SocketImage
                    source={require('../../assets/images/socket.png')}
                    resizeMode="contain"
                  />
                  <Gutter />
                  <Text>Charging cost</Text>
                  <Flexer />
                  <Text>{receipt.chargingCost}€</Text>
                </Row>

                <Gutter vertical />

                <Row>
                  <Icon.MaterialIcons
                    name="local-parking"
                    size={20}
                    color={theme.greyDarkest}
                  />
                  <Gutter />
                  <Text>Parking cost</Text>
                  <Flexer />
                  <Text>{receipt.parkingCost}€</Text>
                </Row>

                <Divider />

                <Row>
                  <Icon.MaterialIcons
                    name="euro-symbol"
                    size={20}
                    color={theme.greyDarkest}
                  />
                  <Gutter />
                  <Text>Total amount paid</Text>
                  <Flexer />
                  <Text bold>{receipt.totalCost}€</Text>
                </Row>
              </Summary>

              <Gutter vertical amount={32} />

              <Text center size={18}>
                Thank you for choosing Oneiro!
              </Text>

              <Gutter vertical amount={32} />

              <Button onPress={() => this.props.closePaymentReceiptModal()}>
                <Text color="#fff" bold>
                  Close
                </Text>
              </Button>
            </Content>
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
  overflow: hidden;
`;

const Content = styled.View`
  padding-top: 48px;
  padding-bottom: 16px;
  padding-horizontal: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${props => props.theme.grey};
  width: 100%;
  margin-vertical: 8px;
`;

const Summary = styled.View`
  margin-horizontal: -16px;
  padding-horizontal: 16px;
  padding-vertical: 16px;
  background-color: ${props => props.theme.greyLightest};
  border-color: ${props => props.theme.grey};
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Header = styled.View`
  background-color: ${props => props.theme.primaryColorDark};
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  height: 100px;
`;

const LogoWrapper = styled.View`
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 4px solid ${props => props.theme.primaryColorLightest};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  margin-bottom: -24px;
`;

const Logo = styled.Image`
  width: 32px;
  height: 32px;
`;

const SocketImage = styled.Image`
  width: 18px;
  height: 18px;
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
