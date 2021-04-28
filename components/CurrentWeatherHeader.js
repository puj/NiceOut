import React from 'react';
import styled from 'styled-components/native';
import { CurrentWeather } from '../components/CurrentWeather';
import { CustomTextComponent } from '../components/CustomTextComponent';
const HeaderContainer = styled.View`
  width: 100%;
  height: 64px;
  background-color: '#fff000';
  padding: 12px;
`;

const CurrentContainer = styled.View`
  display: flex;
  flex: 1;
  width: 50%;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  border: 1px solid #dfdfdf;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const HeaderTitleContainer = styled.View`
  flex: 1;
  position: absolute;
  left: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  justify-content: center;
  padding: 12px;
`;

const HeaderTitle = styled(CustomTextComponent)`
  font-size: 24px;
`;

export const CurrentWeatherHeader = ({ current }) => {
  console.log(current);
  return (
    <HeaderContainer>
      <HeaderTitleContainer>
        <HeaderTitle>Nice Out</HeaderTitle>
      </HeaderTitleContainer>
      <CurrentContainer>
        <CurrentWeather current={current}></CurrentWeather>
      </CurrentContainer>
    </HeaderContainer>
  );
};
