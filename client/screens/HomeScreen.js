import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Location, Permissions, MapView } from 'expo';
import { connect } from 'react-redux';

import NearbyStations from '../components/station/NearbyStations';
import StationDetailsModal from '../components/station/StationDetailsModal';
import stationModel from '../components/station/station.model';

class HomeScreen extends React.Component {
  static propTypes = {
    selectedStation: PropTypes.number,
  };

  static navigationOptions = {
    header: null,
  };

  mapRef = React.createRef(); // eslint-disable-line

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
    const { selectedStation } = this.props;

    if (!location) return null;

    const initialRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
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
        >
          <NearbyStations />
        </MapView>

        {selectedStation && <StationDetailsModal />}
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const mapStateToProps = state => ({
  selectedStation: stationModel.selectors.getSelectedStation(state),
});

export default connect(mapStateToProps)(HomeScreen);
