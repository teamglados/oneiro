import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import theme from '../../constants/theme';

class ChargingPending extends Component {
  render() {
    return (
      <Wrapper>
        <ChargingImage
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
  padding: 24px;
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const ChargingImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export default ChargingPending;
