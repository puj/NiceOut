import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { formatTemperatureWithoutUnits } from '../utils/TemperatureUtils';

import Svg, { Polygon, Line } from 'react-native-svg';

const HourlyForecastContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const HourName = styled.Text`
  flex: 1;
  color: #afafaf;
  font-size: 16px;
`;
const Temperature = styled.Text`
  align-self: center;
  flex: 1;
  font-size: 12px;
`;
// const Graph = styled(Svg)`
const Graph = styled.View`
  align-self: center;
  /* background-color: #ff0000; */
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const HourlyForecast = ({ prev, next, forecast, low, high }) => {
  //   const prevTemp = prev ? prev.temp : forecast.temp;
  const [chunkWidth, setChunkWidth] = useState(0);
  const [chunkHeight, setChunkHeight] = useState(0);
  const measureChunk = (e) => {
    const width = e.nativeEvent.layout.width;
    const height = e.nativeEvent.layout.height;
    if (chunkWidth === width) {
      return;
    }
    setChunkHeight(height);
    setChunkWidth(width);
    console.log(width);
    console.log(height);
  };

  const prevTemp = forecast.temp;
  const nextTemp = next ? next.temp : forecast.temp;
  //   console.log(low, high);
  const normalizedFrom = (prevTemp - low) / (high - low);
  const normalizedTo = (nextTemp - low) / (high - low);

  const graphPadding = chunkHeight * 0.15;
  const y1 =
    chunkHeight - graphPadding - (chunkHeight - graphPadding) * normalizedFrom;
  const y2 =
    chunkHeight - graphPadding - (chunkHeight - graphPadding) * normalizedTo;

  return (
    <HourlyForecastContainer>
      <Temperature>{formatTemperatureWithoutUnits(forecast.temp)}</Temperature>
      <Graph
        height="100%"
        width="100%"
        onLayout={(event) => measureChunk(event)}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chunkWidth} ${chunkHeight}`}
        >
          <Line
            x1="0"
            y1={`${y1}`}
            x2={`${chunkWidth}`}
            y2={`${y2}`}
            stroke="#ccc259"
            strokeWidth="1"
          />
          <Polygon
            points={`
                ${0},${chunkHeight}
                ${chunkWidth},${chunkHeight}
                ${chunkWidth}, ${y2} 
              0 ${y1} 
            `}
            fill="#e6e8c2"
          />
        </Svg>
      </Graph>
      <HourName>{moment(forecast.dt * 1000).format('HH')}</HourName>
    </HourlyForecastContainer>
  );
};
