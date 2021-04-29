import React, { useState } from 'react';
import { HourlyForecast } from '../components/HourlyForecast';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { weather } from '../reducers/weather';

const HourlyForecastContainer = styled.FlatList`
  width: 100%;
  height: 50%;
`;

export const HourlyForecastHorizontalScrollView = ({ forecasts }) => {
  const dispatch = useDispatch();

  const focusedForecast = useSelector((store) => store.weather.focusedForecast);
  const [chunkWidth, setChunkWidth] = useState(0);
  const [chunkHeight, setChunkHeight] = useState(0);
  const hourlyLow = Math.min(...forecasts.map((forecast) => forecast.temp));
  const hourlyHigh = Math.max(...forecasts.map((forecast) => forecast.temp));

  const measureChunk = (e) => {
    if (chunkWidth !== 0) {
      return;
    }
    const width = e.nativeEvent.layout.width;
    const height = e.nativeEvent.layout.height;
    const newChunkHeight = height;
    const newChunkWidth = width / 10;

    setChunkWidth(newChunkWidth);
    setChunkHeight(newChunkHeight);
  };

  const renderItem = ({ item, index, separators }) => {
    const forecast = item;
    return (
      <HourlyForecast
        key={forecast.dt}
        prev={index > 0 ? forecasts[index - 1] : null}
        forecast={forecast}
        next={forecasts[index + 1]}
        low={hourlyLow}
        high={hourlyHigh}
        chunkWidth={chunkWidth}
        chunkHeight={chunkHeight}
        highlighted={focusedForecast && focusedForecast.dt === forecast.dt}
      ></HourlyForecast>
    );
  };

  return (
    <HourlyForecastContainer
      removeClippedSubviews={true}
      data={forecasts}
      renderItem={renderItem}
      keyExtractor={(forecast) => String(forecast.dt)}
      horizontal={true}
      onLayout={(event) => measureChunk(event)}
      scrollEventThrottle={40}
    ></HourlyForecastContainer>
  );
};
