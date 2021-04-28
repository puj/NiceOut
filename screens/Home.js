import React, { useEffect, useState } from 'react';
import { CurrentWeather } from '../components/CurrentWeather';
import { LastFetched } from '../components/LastFetched';
import { DailyForecast } from '../components/DailyForecast';
import { loadWeatherData } from '../reducers/weather';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import { ScrollView, RefreshControl, StyleSheet } from 'react-native';

import styled from 'styled-components/native';
import { HourlyForecastHorizontalScrollView } from '../components/HourlyForecastHorizontalScrollView';
const HomeContainer = styled.View`
  height: 100%;
  width: 100%;
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

export const Home = ({}) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((store) => store.weather.weatherData);
  const [refreshing, setRefreshing] = useState(false);

  // Try to load data from localstorage or network
  useEffect(() => {
    dispatch(loadWeatherData());
  }, []);

  // Cancel animation when data is received
  useEffect(() => {
    setRefreshing(false);
  }, [weatherData]);

  if (!weatherData || !weatherData.daily || !weatherData.hourly) {
    return <></>;
  }

  const dailyForecasts = weatherData.daily;
  const hourlyForecasts = weatherData.hourly;
  // const hourlyForecasts = weatherData.hourly.slice(0, 12);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => dispatch(loadWeatherData(true))}
        />
      }
    >
      <HomeContainer>
        <CurrentContainer>
          <CurrentWeather current={weatherData.current}></CurrentWeather>
          <LastFetched></LastFetched>
        </CurrentContainer>

        <HourlyForecastHorizontalScrollView forecasts={hourlyForecasts} />
        <DailyForecastContainer>
          {dailyForecasts.slice(1).map((dailyForecast) => {
            return (
              <DailyForecast
                key={dailyForecast.dt}
                forecast={dailyForecast}
              ></DailyForecast>
            );
          })}
        </DailyForecastContainer>
      </HomeContainer>
    </ScrollView>
  );
};
