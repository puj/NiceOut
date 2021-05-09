import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';

const MeterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 50%;
  width: 50%;
  margin: 2px;
`;

const MeterBackground = styled.View`
  flex: 8;
  width: 100%;
  height: 100%;
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

const MeterFill = styled(Animated.View)`
  /* width: ${(props) => `${props.fillRatio * 100}%`}; */
  width: ${(props) => `${props.width}`};
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
  const [currentFillRatio, setCurrentFillRatio] = useState(0);
  const animation = useRef(new Animated.Value(currentFillRatio)).current;
  // const width = animation.current.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0%', '100%'],
  //   extrapolate: 'clamp',
  // });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: fillRatio,
      duration: 400,
    }).start();
    // Animated.spring(animation, {
    //   toValue: fillRatio,
    // }).start();
    setCurrentFillRatio(fillRatio);
  }, [fillRatio]);

  const width = animation.interpolate({
    inputRange: [0, 1],
    easing: Easing.bounce(),
    outputRange: ['0%', '100%'],
    useNativeDriver: false,
  });
  return (
    <MeterContainer>
      <MeterIcon source={icon}></MeterIcon>
      <MeterBackground>
        <MeterFill
          style={[{ width }]}
          fillRatio={fillRatio}
          fillColor={fillColor}
        ></MeterFill>
      </MeterBackground>
    </MeterContainer>
  );
};
