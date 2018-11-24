import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import theme from '../../constants/theme';
import AnimatedCircularProgress from '../common/AnimatedCircularProgress';

export default class ChargingStatus extends Component {
  static propTypes = {
    chargingPercentage: PropTypes.number,
  };

  render() {
    const { chargingPercentage } = this.props;

    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  padding: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;
