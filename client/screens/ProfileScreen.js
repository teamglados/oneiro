import React from 'react';
import styled from 'styled-components';

import HistoryList from '../components/history/HistoryList';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Wrapper>
        <HistoryList />
      </Wrapper>
    );
  }
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
