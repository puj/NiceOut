import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { formatTemperature } from '../utils/TemperatureUtils';

const DailyForecastContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const DayName = styled.Text`
  flex: 1;
  color: #afafaf;
  font-size: 16px;
`;

const WeatherIcon = styled.ImageBackground`
  flex: 1;
  align-self: center;
  height: 100%;
`;

const TemperatureHolder = styled.View`
  flex: 1;
  align-self: center;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const Temperature = styled.Text`
  align-self: center;
  font-size: 18px;
`;
const TemperatureLow = styled.Text`
  align-self: center;
  font-size: 14px;
  color: #afafaf;
`;

export const DailyForecast = ({ forecast }) => {
  return (
    <DailyForecastContainer>
      <DayName>{moment(forecast.dt * 1000).format('ddd')}</DayName>
      <WeatherIcon
        resizeMode="contain"
        source={{
          uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
        }}
      ></WeatherIcon>

      <TemperatureHolder>
        <Temperature>{formatTemperature(forecast.temp.max)}</Temperature>
        <TemperatureLow>{formatTemperature(forecast.temp.min)}</TemperatureLow>
      </TemperatureHolder>
    </DailyForecastContainer>
  );
};
