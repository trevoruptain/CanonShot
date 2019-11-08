import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CameraScreenContainer from '../screens/CameraScreenContainer';
import PhotosScreenContainer from '../screens/PhotosScreenContainer';
import SettingsScreen from '../screens/SettingsScreen';
import FileStackScreen from '../screens/FileStackScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CameraStack = createStackNavigator(
  {
    Home: CameraScreenContainer,
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-camera'
          : 'md-camera'
      }
    />
  ),
};

CameraStack.path = '';

const PhotosStack = createStackNavigator(
  {
    Photos: PhotosScreenContainer,
  },
  config
);

PhotosStack.navigationOptions = {
  tabBarLabel: 'Photos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-photos' : 'md-photos'} />
  ),
};

PhotosStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const FileStackStack = createStackNavigator(
  {
    Upload: FileStackScreen,
  },
  config
);

FileStackStack.navigationOptions = {
  tabBarLabel: 'Upload',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-arrow-dropup'
          : 'md-arrow-dropup-circle'
      }
    />
  ),
};

FileStackStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CameraStack,
  PhotosStack,
  SettingsStack,
  FileStackStack
});

tabNavigator.path = '';

export default tabNavigator;
