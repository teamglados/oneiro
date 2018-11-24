import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';

import chargingModel from '../components/charging/charging.model';
import Fade from '../components/common/Fade';
import ChargingActive from '../components/charging/ChargingActive';
import ChargingReserved from '../components/charging/ChargingReserved';
import ChargingPending from '../components/charging/ChargingPending';
import ReceiptModal from '../components/payment/ReceiptModal';

const charginStatuses = ['PENDING', 'RESERVED', 'CHARGING'];

class ChargingStatus extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    chargingPercentage: PropTypes.number,
    chargingStatus: PropTypes.oneOf(charginStatuses).isRequired,
    stopCharging: PropTypes.func.isRequired,
  };

  stopCharging = () => {
    Alert.alert(
      'Stop Charging',
      'Are you sure you want stop charging?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.props.stopCharging() },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { chargingStatus, chargingPercentage } = this.props;

    return (
      <Wrapper>
        <Fade
          visible={chargingStatus === 'PENDING'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingPending />
        </Fade>

        <Fade
          visible={chargingStatus === 'RESERVED'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingReserved />
        </Fade>

        <Fade
          visible={chargingStatus === 'CHARGING'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingActive
            percentage={chargingPercentage || 0}
            stopCharging={this.stopCharging}
          />
        </Fade>

        <ReceiptModal />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const mapStateToProps = state => ({
  chargingPercentage: chargingModel.selectors.getChargingPercentage(state),
  chargingStatus: chargingModel.selectors.getChargingStatus(state),
});

const mapDispatchToProps = {
  stopCharging: chargingModel.actions.stopCharging,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChargingStatus);
