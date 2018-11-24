import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  wWidth: width,
  wHeight: height,
  isSmallDevice: width < 375,
};
