import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { HourlyForecastHorizontalScrollView } from '../components/HourlyForecastHorizontalScrollView';
import { ScrollView, Image } from 'react-native';
import { weather } from '../reducers/weather';
import raindropImage from '../assets/raindrop.png';
import windImage from '../assets/wind.png';
import { useDispatch, useSelector } from 'react-redux';
import { Meter } from '../components/Meter';

const HourlyForecastContainer = styled.View`
  flex: 2.5;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;
const FocusedForecastContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const HourlyDetailsView = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((store) => store.weather.weatherData);
  const focusedForcast = useSelector((store) => store.weather.focusedForcast);
  const hourlyForecasts = weatherData.hourly;

  return (
    <HourlyForecastContainer>
      <HourlyForecastHorizontalScrollView forecasts={hourlyForecasts} />
      {focusedForcast && (
        <FocusedForecastContainer>
          <Meter
            fillRatio={focusedForcast.humidity / 100.0}
            icon={raindropImage}
            fillColor={'#4eb4e5'}
          ></Meter>
          <Meter
            fillRatio={focusedForcast.wind_speed / 10.0}
            icon={windImage}
            fillColor={'#595959'}
          ></Meter>
        </FocusedForecastContainer>
      )}
    </HourlyForecastContainer>
  );
};
