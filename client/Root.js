import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import theme from './constants/theme';
import configureStore from './store';
import { connectApiToStore } from './helpers/api';
import { setupNavigator } from './navigation/navigation.service';

const store = configureStore();
connectApiToStore(store);

export default class Root extends React.Component {
  componentDidMount() {
    setupNavigator(this.navRef.current);
  }

  navRef = React.createRef();

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContainer>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator ref={this.navRef} />
          </AppContainer>
        </ThemeProvider>
      </Provider>
    );
  }
}

const AppContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
