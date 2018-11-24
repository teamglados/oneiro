import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import chargingModel from './charging.model';
import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Fade from '../common/Fade';
import theme from '../../constants/theme';
import AnimatedCircularProgress from '../common/AnimatedCircularProgress';

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
          <Fitted>
            <StatusImage
              source={require('../../assets/images/plug.png')}
              resizeMode="cover"
            />
            <Gutter vertical amount={24} />
            <Text color={theme.primaryColorDarkest} size={20} center>
              Reserve a charging station to get started.
            </Text>
          </Fitted>
        </Fade>

        <Fade
          visible={chargingStatus === 'RESERVED'}
          style={StyleSheet.absoluteFillObject}
        >
          <Fitted>
            <StatusImage
              source={require('../../assets/images/electric-car.png')}
              resizeMode="cover"
            />
            <Gutter vertical amount={24} />
            <Text color={theme.primaryColorDarkest} size={20} center>
              Drive to the charging station
            </Text>
          </Fitted>
        </Fade>

        <Fade
          visible={chargingStatus === 'CHARGING'}
          style={StyleSheet.absoluteFillObject}
        >
          <Fitted>
            <AnimatedCircularProgress
              size={200}
              width={10}
              fill={chargingPercentage || 0}
              tintColor={theme.primaryColorLighter}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={theme.primaryColorDarker}
            >
              {fill => (
                <Text size={40} color={theme.primaryColor}>
                  {`${Math.round(fill)}%`}
                </Text>
              )}
            </AnimatedCircularProgress>
            <Gutter vertical amount={24} />
            <Text color={theme.primaryColorDarkest} size={20} center>
              Your car is charging...
            </Text>
          </Fitted>
        </Fade>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const Fitted = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const StatusImage = styled.Image`
  width: 200px;
  height: 200px;
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
