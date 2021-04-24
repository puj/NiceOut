import React, { useEffect, useState } from 'react';
import { CurrentWeather } from '../components/CurrentWeather';
import { LastUpdated } from '../components/LastUpdated';
import { DailyForecast } from '../components/DailyForecast';
import { HourlyForecast } from '../components/HourlyForecast';

import { View, Platform, Text } from 'react-native';
import {
  retrieveWeatherData,
  retrieveWeatherLastUpdated,
  fetchWeatherTask,
} from '../utils/ScheduledTaskManager';

import styled from 'styled-components/native';

const HomeContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  background-color: #d3d3d3;
`;

const CurrentContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  /* margin: 12px; */
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const DailyForecastContainer = styled.View`
  flex: 8;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  /* padding: 12px; */
  /* margin: 12px; */
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const HourlyForecastContainer = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

export const Home = ({ route }) => {
  const [weatherData, setWeatherData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  // if (Platform.OS !== 'web') {
  useEffect(() => {
    const restoreWeatherDataState = async () => {
      const restoredLastUpdated = await retrieveWeatherLastUpdated();
      const restoredWeatherData = await retrieveWeatherData();

      const timeSinceLastUpdate =
        new Date().getTime() - restoredLastUpdated.getTime();
      const timeElapsed = timeSinceLastUpdate > 60 * 60 * 30;

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

  if (!weatherData || !weatherData.daily || !weatherData.hourly) {
    return <></>;
  }

  const dailyForecasts = weatherData.daily;
  const hourlyForecasts = weatherData.hourly.slice(0, 12);
  const hourlyLow = Math.min(
    ...hourlyForecasts.map((forecast) => forecast.temp)
  );
  const hourlyHigh = Math.max(
    ...hourlyForecasts.map((forecast) => forecast.temp)
  );

  return (
    <HomeContainer>
      <CurrentContainer>
        <CurrentWeather current={weatherData.current}></CurrentWeather>
        <LastUpdated lastUpdated={lastUpdated}></LastUpdated>
      </CurrentContainer>
      <HourlyForecastContainer>
        {hourlyForecasts.map((hourlyForecast, index) => {
          return (
            <HourlyForecast
              key={hourlyForecast.dt}
              prev={index > 0 ? hourlyForecasts[index - 1] : null}
              forecast={hourlyForecast}
              next={hourlyForecasts[index + 1]}
              low={hourlyLow}
              high={hourlyHigh}
            ></HourlyForecast>
          );
        })}
      </HourlyForecastContainer>
      <DailyForecastContainer>
        {dailyForecasts.map((dailyForecast) => {
          return (
            <DailyForecast
              key={dailyForecast.dt}
              forecast={dailyForecast}
            ></DailyForecast>
          );
        })}
      </DailyForecastContainer>
    </HomeContainer>
  );
};
