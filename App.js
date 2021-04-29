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

import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import { OriginalSurfer_400Regular } from '@expo-google-fonts/original-surfer';
import { RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import AppLoading from 'expo-app-loading';
import { CurrentWeatherHeader } from './components/CurrentWeatherHeader';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const reducer = combineReducers({ weather: weather.reducer });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const Stack = createStackNavigator();

if (Platform.OS !== 'web') {
  defineTask();
  scheduleTask();
}

const App = () => {
  let [fontsLoaded] = useFonts({
    OriginalSurfer_400Regular,
    WorkSans_500Medium,
    RobotoCondensed_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Nice Out"
            component={Home}
            // options={{
            //   headerShown: false,
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
