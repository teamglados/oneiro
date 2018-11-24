import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from '../common/Text';

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
      <Fragment>
        <HeaderImage source={{ uri: imgUrl }} resizeMode="cover" />
        <Content>
          <Text>{address}</Text>
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </Content>
      </Fragment>
    );
  }
}

const HeaderImage = styled.Image`
  height: 200px;
  border-top-right-radius: 8;
  border-top-left-radius: 8;
  background-color: ${props => props.theme.greyLighter};
`;

const Content = styled.View`
  padding: 16px;
`;
