import React from 'react';
import { Icon } from 'expo';

import {
  createStackNavigator,
  createBottomTabNavigator,
  // createNavigationContainer,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ChargingScreen from '../screens/ChargingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import theme from '../constants/theme';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Nearby',
  // eslint-disable-next-line
  tabBarIcon: ({ focused }) => (
    <Icon.MaterialCommunityIcons
      name="map-marker-multiple"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? theme.primaryColor : theme.greyDarker}
    />
  ),
};

const ChargingStack = createStackNavigator({
  Charging: ChargingScreen,
});

ChargingStack.navigationOptions = {
  tabBarLabel: 'Charging',
  // eslint-disable-next-line
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="battery-charging"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? theme.primaryColor : theme.greyDarker}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  // eslint-disable-next-line
  tabBarIcon: ({ focused }) => (
    <Icon.Feather
      name="user"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? theme.primaryColor : theme.greyDarker}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ChargingStack,
  ProfileStack,
});
