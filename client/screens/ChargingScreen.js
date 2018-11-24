import React from 'react';
import styled from 'styled-components';

import ChargingPending from '../components/charging/ChargingPending';

export default class ChargingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Wrapper>
        <ChargingPending />
      </Wrapper>
    );
  }
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
