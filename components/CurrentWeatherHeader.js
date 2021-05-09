import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { CurrentWeather } from '../components/CurrentWeather';
import { CustomTextComponent } from '../components/CustomTextComponent';
import { HeaderHeightContext, useHeaderHeight } from '@react-navigation/stack';
import Constants from 'expo-constants';
import background from '../assets/background.jpg';

const HeaderImage = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;
const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
  top: ${(props) =>
    `${Platform.OS == 'ios' ? 0 : Constants.statusBarHeight}px`};
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
      <HeaderImage source={background}></HeaderImage>
      <HeaderTitleContainer>
        <HeaderTitle>Nice Out</HeaderTitle>
      </HeaderTitleContainer>
      <CurrentContainer>
        <CurrentWeather current={current}></CurrentWeather>
      </CurrentContainer>
    </HeaderContainer>
  );
};
