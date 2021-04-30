import React from 'react';
import styled from 'styled-components/native';

const MeterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 40%;
  width: 50%;
  margin: 2px;
`;

const MeterBackground = styled.View`
  flex: 8;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #ddd;
  margin-left: 6px;
  /* box-shadow: 2px 1px 1px #aaa; */
  /* border-width: 1px; */
  border-color: #ddd;
  border-bottom-width: 0;
  shadow-color: #aaa;
  shadow-offset: 1px 2px;
  shadow-radius: 2px;
  elevation: 3;
`;

const MeterFill = styled.View`
  width: ${(props) => `${props.fillRatio * 100}%`};
  height: 100%;
  border-radius: 4px;
  background-color: ${(props) => `${props.fillColor}`};
`;

const MeterIcon = styled.Image`
  flex: 1;
  padding: 2px;
  height: 100%;
  resize-mode: contain;
`;

export const Meter = ({ fillRatio, icon, fillColor }) => {
  return (
    <MeterContainer>
      <MeterIcon source={icon}></MeterIcon>
      <MeterBackground>
        <MeterFill fillRatio={fillRatio} fillColor={fillColor}></MeterFill>
      </MeterBackground>
    </MeterContainer>
  );
};
