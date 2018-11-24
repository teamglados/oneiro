import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import openMap from 'react-native-open-maps';
import { Icon } from 'expo';

import Text from '../common/Text';
import Flexer from '../common/Flexer';
import Gutter from '../common/Gutter';
import theme from '../../constants/theme';

export default class StationDetails extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  openExternalMap = () => {
    const { latitude, longitude } = this.props;
    openMap({ latitude, longitude });
  };

  render() {
    const { address, imgUrl } = this.props;

    return (
      <Fragment>
        <HeaderImage source={{ uri: imgUrl }} resizeMode="cover" />
        <Content>
          <Row>
            <Text size={20} bold>
              {address}
            </Text>
            <Flexer />
            <RouteButton onPress={this.openExternalMap}>
              <Icon.MaterialIcons
                name="directions"
                size={26}
                color={theme.primaryColor}
              />
              <Text size={10} color={theme.primaryColor}>
                ROUTE
              </Text>
            </RouteButton>
          </Row>

          <Gutter vertical amount={4} />

          <Row>
            <SocketImage
              source={require('../../assets/images/socket.png')}
              resizeMode="contain"
            />
            <Gutter amount={8} />
            <SocketInfo>
              <Text size={16} bold style>
                22
              </Text>
              <Text size={10} style={{ marginTop: -3 }}>
                kW
              </Text>
            </SocketInfo>
          </Row>
        </Content>
      </Fragment>
    );
  }
}

const HeaderImage = styled.Image`
  height: 200px;
  width: 100%;
  background-color: ${props => props.theme.greyLighter};
`;

const Content = styled.View`
  padding: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RouteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const SocketInfo = styled.View`
  align-items: center;
  justify-content: center;
`;

const SocketImage = styled.Image`
  width: 32px;
  height: 32px;
`;
