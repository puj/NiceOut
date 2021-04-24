import React from 'react';
import { View, Text } from 'react-native';

import Constants from 'expo-constants';
const API_KEY = Constants.manifest.extra.API_KEY;

export const Home = ({ route }) => {
  return (
    <View>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
    </View>
  );
};
