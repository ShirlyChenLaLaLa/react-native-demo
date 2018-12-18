import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import VideoScreen from './VideoScreen';
import AboutScreen from './AboutScreen';
import MerryScreen from './Merry';

// disable warning in the app
console.disableYellowBox = true;
// set color of status bar
// shoule be dark-content or light-content
StatusBar.setBarStyle('dark-content');

const TabNavigation = createBottomTabNavigator({
  Home: MerryScreen,
  About: AboutScreen,
  Merry: MerryScreen,
});

const StackNavigation = createStackNavigator({
  Tab: TabNavigation,
  Video: VideoScreen,
});

export default StackNavigation;
