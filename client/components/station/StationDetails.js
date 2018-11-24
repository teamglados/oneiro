import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Icon } from 'expo';

import Text from '../common/Text';
import Flexer from '../common/Flexer';
import Gutter from '../common/Gutter';
import RouteButton from '../common/RouteButton';
import theme from '../../constants/theme';

export default class StationDetails extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    endingTime: PropTypes.instanceOf(Date).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  render() {
    const { address, imgUrl, latitude, longitude, endingTime } = this.props;

    return (
      <Fragment>
        <HeaderImage source={{ uri: imgUrl }} resizeMode="cover" />
        <Content>
          <Row>
            <Text size={24} bold>
              {address}
            </Text>
            <Flexer />
            <RouteButton latitude={latitude} longitude={longitude} />
          </Row>

          <Gutter vertical amount={4} />

          <Row>
            <Icon.Feather name="clock" size={16} color={theme.greyDarkest} />
            <Gutter amount={8} />
            <Text size={16}>Available until:</Text>
            <Gutter amount={4} />
            <Text size={16}>{format(endingTime, 'H:mm')}</Text>
            <Gutter amount={4} />
            <Text size={14} color={theme.greyDarkest}>
              {format(endingTime, '(DD.MM.YYYY)')}
            </Text>
          </Row>

          <Gutter vertical />

          <ChargingInfo>
            <Row>
              <SocketImage
                source={require('../../assets/images/socket.png')}
                resizeMode="contain"
              />
              <Gutter amount={8} />
              <SocketInfo>
                <Text size={20} bold>
                  22
                </Text>
                <Text size={10} style={{ marginTop: -3 }}>
                  kW
                </Text>
              </SocketInfo>

              <Flexer />

              <Prices>
                <Row>
                  <Text size={16} color={theme.greyDarkest}>
                    Per kWh:
                  </Text>
                  <Price>
                    <Text size={16} bold>
                      0.25 €
                    </Text>
                  </Price>
                </Row>

                <Row>
                  <Text size={16} color={theme.greyDarkest}>
                    Parkkimaksu:
                  </Text>
                  <Price>
                    <Text size={16} bold>
                      1 €
                    </Text>
                  </Price>
                </Row>
              </Prices>
            </Row>
          </ChargingInfo>
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

const Prices = styled.View`
  align-items: flex-end;
`;

const Price = styled.View`
  width: 80px;
  align-items: flex-end;
`;

const ChargingInfo = styled.View`
  margin-horizontal: -16px;
  padding-horizontal: 16px;
  padding-vertical: 16px;
  background-color: ${props => props.theme.greyLightest};
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${props => props.theme.grey};
`;

const SocketInfo = styled.View`
  align-items: center;
  justify-content: center;
`;

const SocketImage = styled.Image`
  width: 32px;
  height: 32px;
`;
