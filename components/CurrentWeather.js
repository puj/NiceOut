import React from 'react';
import styled from 'styled-components/native';
import { formatTemperature } from '../utils/TemperatureUtils';
import moment from 'moment';
const CurrentWeatherContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const CurrentDay = styled.Text`
  flex: 1;
  align-self: center;
  color: #4f4f4f;
  font-size: 18px;
  font-weight: bold;
`;

const CurrentTemperature = styled.Text`
  flex: 1;
  align-self: center;
  color: #4f4f4f;
  font-size: 20px;
  font-weight: bold;
`;
const CurrentWeatherIcon = styled.ImageBackground`
  flex: 1;
  align-self: center;
  height: 100%;
`;

export const CurrentWeather = ({ current }) => {
  if (!current) {
    return <></>;
  }
  return (
    <CurrentWeatherContainer>
      <CurrentDay>{moment().format('ddd')}</CurrentDay>
      <CurrentWeatherIcon
        source={{
          uri: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
        }}
      ></CurrentWeatherIcon>
      <CurrentTemperature>{formatTemperature(current.temp)}</CurrentTemperature>
    </CurrentWeatherContainer>
  );
};
