import React from 'react';
import styled from 'styled-components/native';
import { CurrentWeather } from '../components/CurrentWeather';
import { CustomTextComponent } from '../components/CustomTextComponent';
import { HeaderHeightContext, useHeaderHeight } from '@react-navigation/stack';
import Constants from 'expo-constants';

const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
  top: ${(props) => `${Constants.statusBarHeight}px`};
  height: ${(props) => `${props.headerHeight || 120}px`};
`;

const CurrentContainer = styled.View`
  display: flex;
  flex: 1;
  width: 50%;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
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
  const headerHeight = useHeaderHeight();
  return (
    <HeaderContainer headerHeight={headerHeight}>
      <HeaderTitleContainer>
        <HeaderTitle>Nice Out</HeaderTitle>
      </HeaderTitleContainer>
      <CurrentContainer>
        <CurrentWeather current={current}></CurrentWeather>
      </CurrentContainer>
    </HeaderContainer>
  );
};
