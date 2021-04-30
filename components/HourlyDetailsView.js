import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { HourlyForecastHorizontalScrollView } from '../components/HourlyForecastHorizontalScrollView';
import {ForecastDetailsView} from "../components/ForecastDetailsView"
import { useDispatch, useSelector } from 'react-redux';

const HourlyForecastContainer = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

export const HourlyDetailsView = () => {
  const dispatch = useDispatch();
  
  const weatherData = useSelector((store) => store.weather.weatherData); const focusedForecast = useSelector((store) => store.weather.focusedForecast);
  const hourlyForecasts = weatherData.hourly;

  return (
    <HourlyForecastContainer>
      <HourlyForecastHorizontalScrollView forecasts={hourlyForecasts} />
      <ForecastDetailsView forecast={focusedForecast}></ForecastDetailsView>
    </HourlyForecastContainer>
  );
};
