import React, { useEffect, useState } from 'react';
import { CurrentWeatherHeader } from '../components/CurrentWeatherHeader';
import { WeekForecast } from '../components/WeekForecast';
import { HourlyDetailsView } from '../components/HourlyDetailsView';
import { loadWeatherData } from '../reducers/weather';
import { useDispatch, useSelector } from 'react-redux';

import Constants from 'expo-constants';

import { Platform, RefreshControl, StyleSheet, Text } from 'react-native';

import styled from 'styled-components/native';

const MainContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const HomeContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  background-color: #d3d3d3;
`;

const RelativeLayoutScrollView = styled.ScrollView`
  top: ${(props) =>
    `${Platform.OS == 'ios' ? 0 : Constants.statusBarHeight}px`};
`;

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((store) => store.weather.weatherData);
  const [refreshing, setRefreshing] = useState(false);

  // Try to load data from localstorage or network
  useEffect(() => {
    dispatch(loadWeatherData());

    navigation.setOptions({
      header: () => false,
    });
  }, []);

  // Cancel animation when data is received
  useEffect(() => {
    setRefreshing(false);
  }, [weatherData]);

  if (!weatherData || !weatherData.daily || !weatherData.hourly) {
    return <></>;
  }

  const dailyForecasts = weatherData.daily;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS == 'ios' ? 0 : Constants.statusBarHeight,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <MainContainer>
      <CurrentWeatherHeader current={weatherData.current} />
      <RelativeLayoutScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => dispatch(loadWeatherData(true))}
          />
        }
      >
        <HomeContainer>
          <HourlyDetailsView></HourlyDetailsView>
          <WeekForecast dailyForecasts={dailyForecasts}></WeekForecast>
        </HomeContainer>
      </RelativeLayoutScrollView>
    </MainContainer>
  );
};
