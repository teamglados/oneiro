import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Flexer from '../common/Flexer';
import Button from '../common/Button';
import theme from '../../constants/theme';

export default class ChargingPending extends Component {
  static propTypes = {
    startCharging: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Wrapper>
        <Flexer />

        <StatusImage
          source={require('../../assets/images/electric-car.png')}
          resizeMode="cover"
        />

        <Gutter vertical amount={24} />

        <Text color={theme.primaryColorDarkest} size={20} center>
          You are now ready to start charging!
        </Text>

        <Gutter vertical amount={24} />

        <Text color={theme.primaryColorDarkest} size={20} center bold>
          Please connect the cable.
        </Text>

        <Flexer />

        <Button onPress={() => this.props.startCharging()}>
          <Text color="#fff" bold>
            START CHARGING
          </Text>
        </Button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  padding-horizontal: 16px;
  padding-vertical: 24px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const StatusImage = styled.Image`
  width: 160px;
  height: 160px;
`;

const RouteInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Timer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  margin-top: 32px;
  border: 1px solid ${props => props.theme.grey};
  border-radius: 8px;
`;
