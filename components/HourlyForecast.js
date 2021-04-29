import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { weather } from '../reducers/weather';
import {
  calculateNicenessFactor,
  formatTemperatureWithDegreeSymbol,
  formatTemperatureWithoutUnits,
} from '../utils/TemperatureUtils';

import Svg, { Polygon, Line } from 'react-native-svg';
import { CustomTextComponent } from './CustomTextComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';

const HourlyForecastContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: ${(props) => `${props.chunkWidth}px`}; */
  background-color: ${(props) =>
    props.highlighted ? '#838383' : 'transparent'};
  border-radius: 4px;
  height: 100%;
`;

const VerticalAlignCell = styled.View`
  flex: 1;
  align-self: center;
  text-align: center;
  justify-content: center;
`;

const TimeLabel = styled(CustomTextComponent)`
  color: ${(props) => (props.isDay ? '#3f3f3f' : '#afafaf')};
  font-size: 16px;
`;
const Temperature = styled(CustomTextComponent)`
  font-size: 12px;
`;
const Graph = styled.View`
  width: ${(props) => `${props.chunkWidth}px`};
  height: 100%;
`;

const isDayLabel = (hour) => {
  if (hour == 23 || hour == 0) {
    return true;
  }
  return false;
};

export const HourlyForecast = React.memo(
  ({
    prev,
    next,
    forecast,
    low,
    high,
    chunkWidth,
    chunkHeight,
    highlighted,
  }) => {
    const dispatch = useDispatch();
    const hour = moment(forecast.dt * 1000).format('HH');
    const day = moment(forecast.dt * 1000).format('ddd');

    const prevTemp = forecast.temp;
    const nextTemp = next ? next.temp : forecast.temp;

    const normalizedFrom = (prevTemp - low) / (high - low);
    const normalizedTo = (nextTemp - low) / (high - low);

    const graphPadding = chunkHeight * 0.15;
    const y1 =
      chunkHeight -
      graphPadding -
      (chunkHeight - graphPadding) * normalizedFrom;
    const y2 =
      chunkHeight - graphPadding - (chunkHeight - graphPadding) * normalizedTo;

    return (
      <HourlyForecastContainer
        chunkWidth={chunkWidth}
        highlighted={highlighted}
        onPress={() =>
          dispatch(
            weather.actions.setFocusedForecast({ focusedForecast: forecast })
          )
        }
      >
        <VerticalAlignCell>
          <Temperature>
            {formatTemperatureWithDegreeSymbol(forecast.temp)}
          </Temperature>
        </VerticalAlignCell>
        <VerticalAlignCell>
          <Graph chunkWidth={chunkWidth}>
            <Svg
              preserveAspectRatio="none"
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
                  205 - parseInt(165 * calculateNicenessFactor(forecast))
                },100%,80%)`}
              />
            </Svg>
          </Graph>
        </VerticalAlignCell>
        <VerticalAlignCell>
          <TimeLabel isDay={isDayLabel(hour)}>
            {isDayLabel(hour) ? day : hour}
          </TimeLabel>
        </VerticalAlignCell>
      </HourlyForecastContainer>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.forecast.dt != nextProps.forecast.dt) {
      return false;
    }
    if (prevProps.chunkHeight != nextProps.chunkHeight) {
      return false;
    }
    if (prevProps.chunkWidth != nextProps.chunkHeight) {
      return false;
    }
    if (prevProps.highlighted != nextProps.highlighted) {
      return false;
    }
    return true;
  }
);
