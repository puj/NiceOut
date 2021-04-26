import React, { useEffect } from 'react';
import { CurrentWeather } from '../components/CurrentWeather';
import { LastFetched } from '../components/LastFetched';
import { DailyForecast } from '../components/DailyForecast';
import { HourlyForecast } from '../components/HourlyForecast';
import { loadWeatherData } from '../reducers/weather';
import { useDispatch, useSelector } from 'react-redux';

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

export const Home = ({}) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((store) => store.weather.weatherData);

  useEffect(() => {
    dispatch(loadWeatherData());
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
        <LastFetched></LastFetched>
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
  );
};
