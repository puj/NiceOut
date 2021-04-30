import React from 'react';
import styled from 'styled-components/native';
import raindropImage from '../assets/raindrop.png';
import windImage from '../assets/wind.png';
import cloudImage from '../assets/clouds.png';
import { Meter } from '../components/Meter';

const FocusedForecastContainer = styled.View`
  padding-top: 6px;
  height: 50%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  flex-wrap: wrap;
`;

export const ForecastDetailsView = ({ forecast }) => {
  if (!forecast) {
    return <></>;
  }

  return (
    <FocusedForecastContainer>
      <Meter
        fillRatio={forecast.humidity / 100.0}
        icon={raindropImage}
        fillColor={'#424dee'}
      ></Meter>
      <Meter
        fillRatio={forecast.wind_speed / 10.0}
        icon={windImage}
        fillColor={'#a5d4ff'}
      ></Meter>
      <Meter
        fillRatio={(5 + Math.max(forecast.clouds - 5, 0)) / 100.0}
        icon={cloudImage}
        fillColor={'#929292'}
      ></Meter>
    </FocusedForecastContainer>
  );
};
