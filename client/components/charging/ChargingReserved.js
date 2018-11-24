import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';

import Text from '../common/Text';
import Gutter from '../common/Gutter';
import RouteButton from '../common/RouteButton';
import theme from '../../constants/theme';
import { msToMinAndSec } from '../../helpers/utils';

export default class ChargingPending extends Component {
  static propTypes = {
    reservationTimer: PropTypes.instanceOf(Date),
    reservationExpiry: PropTypes.instanceOf(Date),
    stationDetails: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const { reservationTimer, reservationExpiry, stationDetails } = this.props;

    return (
      <Wrapper>
        <StatusImage
          source={require('../../assets/images/charging.png')}
          resizeMode="cover"
        />

        <Gutter vertical amount={24} />

        <Text color={theme.primaryColorDarkest} size={20} center>
          The charging station is now reserved.
        </Text>

        <Gutter vertical amount={32} />

        <RouteInfo>
          <Text bold color={theme.primaryColorDarkest} size={20} center>
            {stationDetails.address}
          </Text>
          <Gutter amount={24} />
          <RouteButton
            latitude={stationDetails.latitude}
            longitude={stationDetails.longitude}
          />
        </RouteInfo>

        {reservationTimer !== null && !!reservationExpiry && (
          <Timer>
            <Text size={14}>REMAINING TIME:</Text>
            <Text size={24} bold>
              {msToMinAndSec(
                differenceInMilliseconds(reservationExpiry, reservationTimer)
              )}
            </Text>
          </Timer>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  padding: 16px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const StatusImage = styled.Image`
  width: 200px;
  height: 200px;
`;

const RouteInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Timer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  margin-top: 32px;
  border: 1px solid ${props => props.theme.grey};
  border-radius: 8px;
`;
