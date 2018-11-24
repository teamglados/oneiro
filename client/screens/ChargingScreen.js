import React from 'react';
import styled from 'styled-components';

import ChargingStatus from '../components/charging/ChargingStatus';

export default class ChargingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Wrapper>
        <ChargingStatus />
      </Wrapper>
    );
  }
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
