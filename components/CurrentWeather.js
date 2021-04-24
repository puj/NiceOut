import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { formatTemperature } from '../utils/TemperatureUtils';
const CurrentWeatherContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const CurrentTemperature = styled.Text`
  flex: 1;
  align-self: center;
  font-size: 24px;
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
      <CurrentWeatherIcon
        source={{
          uri: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
        }}
      ></CurrentWeatherIcon>
      <CurrentTemperature>{formatTemperature(current.temp)}</CurrentTemperature>
    </CurrentWeatherContainer>
  );
};
