import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home';
import { defineTask, scheduleTask } from './utils/ScheduledTaskManager';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

if (Platform.OS !== 'web') {
  defineTask();
  scheduleTask();
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
