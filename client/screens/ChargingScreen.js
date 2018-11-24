import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import chargingModel from '../components/charging/charging.model';
import Fade from '../components/common/Fade';
import ChargingActive from '../components/charging/ChargingActive';
import ChargingReserved from '../components/charging/ChargingReserved';
import ChargingPending from '../components/charging/ChargingPending';

const charginStatuses = ['PENDING', 'RESERVED', 'CHARGING'];

class ChargingStatus extends Component {
  static propTypes = {
    chargingPercentage: PropTypes.number,
    chargingStatus: PropTypes.oneOf(charginStatuses).isRequired,
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
          <ChargingActive percentage={chargingPercentage || 0} />
        </Fade>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChargingStatus);
