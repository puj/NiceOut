import React, { useEffect, useState } from 'react';

import { View, Platform, Text } from 'react-native';
import {
  retrieveWeatherData,
  retrieveWeatherLastUpdated,
  fetchWeatherTask,
} from '../utils/ScheduledTaskManager';

export const Home = ({ route }) => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  if (Platform.OS !== 'web') {
    useEffect(() => {
      const restoreWeatherDataState = async () => {
        const restoredLastUpdated = await retrieveWeatherLastUpdated();
        const restoredWeatherData = await retrieveWeatherData();

        const timeSinceLastUpdate =
          new Date().getTime() - restoredLastUpdated.getTime();
        const timeElapsed = timeSinceLastUpdate > 1000 * 60 * 60 * 30;

        const shouldRunAgain =
          !restoredLastUpdated || !restoredWeatherData || timeElapsed;

        if (shouldRunAgain) {
          await fetchWeatherTask();
          await restoreWeatherDataState();
        }

        setLastUpdated(new Date(restoredLastUpdated));
        setWeatherData(restoredWeatherData);
      };
      restoreWeatherDataState();
    }, []);
  }

  return (
    <View>
      <Text>{JSON.stringify(lastUpdated)}</Text>
    </View>
  );
};
