import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import stationModel from './station.model';
import StationMarker from './StationMarker';

class NearbyStations extends Component {
  static propTypes = {
    nearbyStations: PropTypes.array.isRequired,
    fetchNearbyStations: PropTypes.func.isRequired,
    selectStation: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchNearbyStations();
  }

  render() {
    const { nearbyStations } = this.props;

    if (nearbyStations.length === 0) return null;

    return (
      <Fragment>
        {nearbyStations.map(({ latitude, longitude, id }) => (
          <StationMarker
            latitude={latitude}
            longitude={longitude}
            key={id}
            handlePress={() => this.props.selectStation(id)}
          />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nearbyStations: stationModel.selectors.getNearbyStations(state),
});

const mapDispatchToProps = {
  fetchNearbyStations: stationModel.actions.fetchNearbyStations,
  selectStation: stationModel.actions.selectStation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyStations);
