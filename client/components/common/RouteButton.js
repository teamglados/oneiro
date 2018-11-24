import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'expo';
import openMap from 'react-native-open-maps';

import Text from './Text';
import theme from '../../constants/theme';

class RouteButton extends Component {
  static propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  };

  openExternalMap = () => {
    const { latitude, longitude } = this.props;
    openMap({ latitude, longitude });
  };

  render() {
    return (
      <Btn onPress={this.openExternalMap}>
        <Icon.MaterialIcons
          name="directions"
          size={26}
          color={theme.primaryColor}
        />
        <Text size={10} color={theme.primaryColor}>
          ROUTE
        </Text>
      </Btn>
    );
  }
}

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export default RouteButton;
