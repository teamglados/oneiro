import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Flexer from '../common/Flexer';
import Button from '../common/Button';
import theme from '../../constants/theme';
import AnimatedCircularProgress from '../common/AnimatedCircularProgress';

export default class ChargingActive extends Component {
  static propTypes = {
    percentage: PropTypes.number,
    stopCharging: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { percentage, isLoading } = this.props;

    return (
      <Wrapper>
        <Flexer />

        <AnimatedCircularProgress
          size={250}
          width={10}
          fill={percentage || 0}
          tintColor={theme.primaryColorLighter}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor={theme.primaryColorDarker}
        >
          {fill => (
            <Text size={50} color={theme.primaryColor}>
              {`${Math.round(fill)}%`}
            </Text>
          )}
        </AnimatedCircularProgress>

        <Gutter vertical amount={24} />

        <Text color={theme.primaryColorDarkest} size={20} center>
          Your car is charging...
        </Text>

        <Flexer />

        <Button disabled={isLoading} onPress={() => this.props.stopCharging()}>
          <Text color="#fff" bold>
            STOP CHARGING
          </Text>

          {isLoading && (
            <Fragment>
              <Gutter />
              <ActivityIndicator color="#fff" size="small" />
            </Fragment>
          )}
        </Button>
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
