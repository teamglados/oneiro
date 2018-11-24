import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class Fade extends Component {
  constructor(props) {
    super(props);
    this._visibility = new Animated.Value(props.visible ? 1 : 0);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }

    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View
        style={this.state.visible ? combinedStyle : containerStyle}
        {...rest}
      >
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}
