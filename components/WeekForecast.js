import React, { useEffect, useState } from 'react';
import { DailyForecast } from '../components/DailyForecast';
import styled from 'styled-components/native';

const DailyForecastContainer = styled.View`
  flex: 8;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;
export const WeekForecast = ({ dailyForecasts }) => {
  return (
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
  );
};
