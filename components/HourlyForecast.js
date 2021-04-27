import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  calculateNicenessFactor,
  formatTemperatureWithoutUnits,
} from '../utils/TemperatureUtils';

import Svg, { Polygon, Line } from 'react-native-svg';
import { CustomTextComponent } from './CustomTextComponent';

const HourlyForecastContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.chunkWidth}px`};
  height: 100%;
`;
const HourName = styled(CustomTextComponent)`
  flex: 1;
  color: #afafaf;
  font-size: 16px;
`;
const Temperature = styled(CustomTextComponent)`
  align-self: center;
  flex: 1;
  font-size: 12px;
`;
const Graph = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
`;

export const HourlyForecast = ({
  prev,
  next,
  forecast,
  low,
  high,
  chunkWidth,
  chunkHeight,
}) => {
  const prevTemp = forecast.temp;
  const nextTemp = next ? next.temp : forecast.temp;

  const normalizedFrom = (prevTemp - low) / (high - low);
  const normalizedTo = (nextTemp - low) / (high - low);

  const graphPadding = chunkHeight * 0.15;
  const y1 =
    chunkHeight - graphPadding - (chunkHeight - graphPadding) * normalizedFrom;
  const y2 =
    chunkHeight - graphPadding - (chunkHeight - graphPadding) * normalizedTo;

  return (
    <HourlyForecastContainer chunkWidth={chunkWidth}>
      <Temperature>{formatTemperatureWithoutUnits(forecast.temp)}</Temperature>
      <Graph>
        <Svg
          preserveAspectRatio="xMaxYMax slice"
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
            fill={`hsl(${
              180 - parseInt(180 * calculateNicenessFactor(forecast))
            },100%,80%)`}
          />
        </Svg>
      </Graph>
      <HourName>{moment(forecast.dt * 1000).format('HH')}</HourName>
    </HourlyForecastContainer>
  );
};
