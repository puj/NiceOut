import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home';
import { defineTask, scheduleTask } from './utils/ScheduledTaskManager';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import { weather } from './reducers/weather.js';

const reducer = combineReducers({ weather: weather.reducer });
const store = configureStore({ reducer });

const Stack = createStackNavigator();

if (Platform.OS !== 'web') {
  defineTask();
  scheduleTask();
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
