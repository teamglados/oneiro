import React from 'react';
import styled from 'styled-components';
import Text from '../components/common/Text';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Wrapper>
        <Text>Profile here</Text>
      </Wrapper>
    );
  }
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
