import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import theme from '../../constants/theme';

export default class ChargingPlannig extends Component {
  render() {
    return (
      <Wrapper>
        <StatusImage
          source={require('../../assets/images/plug.png')}
          resizeMode="cover"
        />
        <Gutter vertical amount={24} />
        <Text color={theme.primaryColorDarkest} size={20} center>
          Reserve a charging station to get started.
        </Text>
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
  width: 200px;
  height: 200px;
`;
