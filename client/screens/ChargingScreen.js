import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';

import chargingModel from '../components/charging/charging.model';
import stationModel from '../components/station/station.model';
import Fade from '../components/common/Fade';
import ChargingActive from '../components/charging/ChargingActive';
import ChargingReserved from '../components/charging/ChargingReserved';
import ChargingPending from '../components/charging/ChargingPending';
import ChargingPlanning from '../components/charging/ChargingPlannig';
import ReceiptModal from '../components/payment/ReceiptModal';

const charginStatuses = ['PLANNING', 'PENDING', 'RESERVED', 'CHARGING'];

class ChargingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    reservationTimer: PropTypes.instanceOf(Date),
    reservationExpiry: PropTypes.instanceOf(Date),
    chargingPercentage: PropTypes.number,
    chargingStatus: PropTypes.oneOf(charginStatuses).isRequired,
    stopCharging: PropTypes.func.isRequired,
    startCharging: PropTypes.func.isRequired,
    stationDetails: PropTypes.object,
    chargingIsLoading: PropTypes.bool.isRequired,
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
    const {
      chargingStatus,
      chargingPercentage,
      reservationTimer,
      reservationExpiry,
      stationDetails,
      chargingIsLoading,
    } = this.props;

    return (
      <Wrapper>
        <Fade
          visible={chargingStatus === 'PLANNING'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingPlanning />
        </Fade>

        <Fade
          visible={chargingStatus === 'PENDING'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingPending startCharging={this.props.startCharging} />
        </Fade>

        <Fade
          visible={chargingStatus === 'RESERVED'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingReserved
            reservationTimer={reservationTimer}
            reservationExpiry={reservationExpiry}
            stationDetails={stationDetails}
          />
        </Fade>

        <Fade
          visible={chargingStatus === 'CHARGING'}
          style={StyleSheet.absoluteFillObject}
        >
          <ChargingActive
            percentage={chargingPercentage || 0}
            isLoading={chargingIsLoading}
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
  reservationTimer: chargingModel.selectors.getReservationTimer(state),
  reservationExpiry: chargingModel.selectors.getReservationExpiry(state),
  chargingIsLoading: chargingModel.selectors.getIsLoading(state),
  stationDetails: stationModel.selectors.getReservedStationDetails(state),
});

const mapDispatchToProps = {
  stopCharging: chargingModel.actions.stopCharging,
  startCharging: chargingModel.actions.startCharging,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChargingScreen);
