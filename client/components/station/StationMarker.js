import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import styled from 'styled-components';

class StationMarker extends Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    handlePress: PropTypes.func.isRequired,
  };

  render() {
    const { latitude, longitude } = this.props;
    const coordinate = { latitude, longitude };

    return (
      <MapView.Marker coordinate={coordinate} onPress={this.props.handlePress}>
        <CustomMarker>
          <MarkerImage
            source={require('../../assets/images/flash.png')}
            resizeMode="cover"
          />
        </CustomMarker>
      </MapView.Marker>
    );
  }
}

const CustomMarker = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 1px solid ${props => props.theme.primaryColorLightest};
  background-color: ${props => props.theme.primaryColorDarker};
  justify-content: center;
  align-items: center;
`;

const MarkerImage = styled.Image`
  width: 22px;
  height: 22px;
`;

export default StationMarker;
