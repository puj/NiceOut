import React from 'react';
import styled from 'styled-components/native';
import { formatTemperature } from '../utils/TemperatureUtils';
import moment from 'moment';
import { CustomTextComponent } from './CustomTextComponent';

const CurrentWeatherContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CurrentDay = styled(CustomTextComponent)`
  flex: 1;
  align-self: center;
  text-align: center;
  color: #4f4f4f;
  font-size: 18px;
`;

const CurrentTemperature = styled(CustomTextComponent)`
  flex: 1;
  align-self: center;
  text-align: center;
  color: #4f4f4f;
  font-size: 20px;
`;

const CurrentWeatherIcon = styled.Image`
  flex: 1;

  width: 100%;
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
