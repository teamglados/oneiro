import { Platform } from 'react-native';

/* eslint-disable import/no-extraneous-dependencies */
import Animated from 'react-native-reanimated';
/* eslint-enable import/no-extraneous-dependencies */

import LAYOUT from '../constants/layout';

const {
  Value,
  Clock,
  cond,
  set,
  block,
  clockRunning,
  startClock,
  spring,
  stopClock,
} = Animated;

export const sleep = (ms = 500) => new Promise(rslv => setTimeout(rslv, ms));

export const msToMinAndSec = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const a = LAYOUT.wHeight === 812 || LAYOUT.wWidth === 812;
const b = LAYOUT.wHeight === 896 || LAYOUT.wWidth === 896;
export const isIphoneWithNotch =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (a || b);

export function ifIsIphoneWithNotch(iphoneXStyle, regularStyle) {
  return isIphoneWithNotch ? iphoneXStyle : regularStyle;
}

export function runSpring(value, dest, opts = {}) {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    ...opts,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position),
  ]);
}
