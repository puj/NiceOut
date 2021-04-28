import React, { useState } from 'react';
import { HourlyForecast } from '../components/HourlyForecast';
import styled from 'styled-components/native';

const HourlyForecastContainer = styled.ScrollView`
  flex: 1.5;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding: 24px;
`;

export const HourlyForecastHorizontalScrollView = ({ forecasts }) => {
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
    const newChunkWidth = width / 8;

    console.log(newChunkWidth);
    setChunkWidth(newChunkWidth);
    setChunkHeight(newChunkHeight);
  };

  return (
    <HourlyForecastContainer
      horizontal={true}
      contentContainerStyle={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onLayout={(event) => measureChunk(event)}
    >
      {forecasts.map((forecast, index) => {
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
          ></HourlyForecast>
        );
      })}
    </HourlyForecastContainer>
  );
};
