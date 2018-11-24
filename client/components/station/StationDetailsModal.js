import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/* eslint-disable import/no-extraneous-dependencies */
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
/* eslint-enable import/no-extraneous-dependencies */

import stationModel from './station.model';
import LAYOUT from '../../constants/layout';
import { runSpring } from '../../helpers/utils';
import StationDetails from './StationDetails';

const {
  Value,
  Clock,
  cond,
  eq,
  block,
  event,
  and,
  lessOrEq,
  greaterThan,
  call,
} = Animated;

const { wHeight, wWidth } = LAYOUT;

class StationDetailsModal extends React.PureComponent {
  static propTypes = {
    stationDetails: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.clock = new Clock();
    this.gestureState = new Value(State.UNDETERMINED);
    this.close = new Value(1);
    this.velocityY = new Value(0);
    this.translateY = new Value(wHeight);

    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY: this.translateY,
            velocityY: this.velocityY,
            state: this.gestureState,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }

  clearSelection = () => {
    this.props.selectStation(null);
  };

  render() {
    const { translateY, onGestureEvent } = this;
    const { stationDetails } = this.props;

    const modalStyle = {
      transform: [
        {
          translateY: translateY.interpolate({
            inputRange: [0, wHeight],
            outputRange: [0, wHeight],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    const backStyle = {
      opacity: translateY.interpolate({
        inputRange: [0, wHeight],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    };

    return (
      <React.Fragment>
        <Animated.Code>
          {() =>
            block([
              cond(
                eq(this.gestureState, State.UNDETERMINED),
                runSpring(this.translateY, 0)
              ),
              cond(
                and(
                  eq(this.gestureState, State.END),
                  lessOrEq(this.velocityY, 0)
                ),
                runSpring(this.translateY, 0)
              ),
              cond(
                and(
                  eq(this.gestureState, State.END),
                  greaterThan(this.velocityY, 0)
                ),
                [
                  runSpring(this.translateY, wHeight),
                  cond(
                    eq(this.translateY, wHeight),
                    call([], this.clearSelection)
                  ),
                ]
              ),
            ])
          }
        </Animated.Code>

        <Animated.View style={[styles.backdrop, backStyle]} />

        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          onGestureEvent={onGestureEvent}
        >
          <Animated.View style={[styles.modal, modalStyle]}>
            <StationDetails {...stationDetails} />
          </Animated.View>
        </PanGestureHandler>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    height: wHeight,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingTop: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

const mapStateToProps = state => ({
  stationDetails: stationModel.selectors.getStationDetails(state),
});

const mapDispatchToProps = {
  selectStation: stationModel.actions.selectStation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationDetailsModal);