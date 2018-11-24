import React from 'react';
import styled from 'styled-components';
import { Location, Permissions, MapView } from 'expo';

// import Text from '../components/common/Text';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  mapRef = React.createRef();

  state = {
    location: null,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      console.log('Location not granted...');
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({ location: coords }, this.centerMap);
  };

  render() {
    const { location } = this.state;

    if (!location) return null;

    const initialRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return (
      <Wrapper>
        <MapView
          ref={this.mapRef}
          initialRegion={initialRegion}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={require('../constants/map-theme.json')}
          style={{ flex: 1 }}
          showsUserLocation
          showsMyLocationButton
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
