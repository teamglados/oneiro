import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Image, StyleSheet, Dimensions } from 'react-native';
import LAYOUT from '../../constants/layout';
import Text from '../common/Text';

const { wHeight } = LAYOUT;

export default class StationDetails extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  render() {
    const { address, latitude, longitude, imgUrl } = this.props;

    return (
      <Wrapper>
        <HeaderImage source={{ uri: imgUrl }} resizeMode="cover" />
        <Content>
          <Text>{address}</Text>
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  height: ${wHeight - 100}px;
  background-color: #fff;
  border-top-right-radius: 8;
  border-top-left-radius: 8;
`;

const HeaderImage = styled.Image`
  height: 200px;
  border-top-right-radius: 8;
  border-top-left-radius: 8;
  background-color: ${props => props.theme.greyLighter};
`;

const Content = styled.View`
  padding: 16px;
`;
