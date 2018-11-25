import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'expo';
import { format } from 'date-fns';

import historyModel from './history.model';
import theme from '../../constants/theme';
import Text from '../common/Text';
import Gutter from '../common/Gutter';
import Flexer from '../common/Flexer';

class HistoryList extends Component {
  static propTypes = {
    fetchHistory: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.fetchHistory();
  }

  render() {
    const { items, isLoading } = this.props;

    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator size="large" color={theme.greyDarkest} />
        </Centered>
      );
    }

    return (
      <Wrapper>
        <Header>
          <Text bold size={18} color={theme.greyDarkest}>
            YOUR EARNINGS
          </Text>
        </Header>

        <Content contentContainerStyle={{ flexGrow: 1 }}>
          {items.map(item => (
            <HistoryItem key={item.id}>
              <Flexer>
                <Text size={14} color={theme.greyDarkest}>
                  {format(item.date, 'HH.mm - DD.MM.YYYY')}
                </Text>
                <Gutter vertical amount={8} />
                <Row>
                  <Icon.Feather
                    name="clock"
                    size={18}
                    color={theme.greyDarkest}
                  />
                  <Gutter amount={4} />
                  <Text size={18}>{Math.floor(item.duration)} min</Text>
                </Row>
              </Flexer>

              <End>
                <Text size={12} color={theme.greyDarkest}>
                  You received
                </Text>
                <Text size={32} bold>
                  {Number(item.ownersCut).toFixed(2)}€
                </Text>
              </End>
            </HistoryItem>
          ))}
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const End = styled.View`
  align-items: flex-end;
`;

const Header = styled.View`
  padding: 16px;
`;

const HistoryItem = styled.View`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${props => props.theme.greyDark};
`;

const Centered = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SocketImage = styled.Image`
  width: 18px;
  height: 18px;
`;

const mapStateToProps = state => ({
  items: historyModel.selectors.getItems(state),
  isLoading: historyModel.selectors.getIsLoading(state),
});

const mapDispatchToProps = {
  fetchHistory: historyModel.actions.fetchHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryList);
