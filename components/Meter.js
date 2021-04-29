import React from 'react';
import styled from 'styled-components/native';

const MeterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 10px;
  width: 50%;
  margin: 2px;
`;

const MeterBackground = styled.View`
  flex: 8;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #aaa;
  margin-left: 6px;
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
