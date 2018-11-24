import React from 'react';
import { AppLoading, Asset } from 'expo';
import Root from './Root';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => {
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/plug_white.png'),
        require('./assets/images/plug.png'),
        require('./assets/images/electric-car.png'),
        require('./assets/images/socket.png'),
      ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return <Root />;
  }
}
