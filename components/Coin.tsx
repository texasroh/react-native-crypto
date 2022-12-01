import React, { useEffect, useReducer, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  flex: 0.31;
`;
const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const Icon = styled.Image`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

interface ICoinProps {
  symbol: string;
  index: number;
}

const Coin = ({ symbol, index }: ICoinProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    <Wrapper style={{ opacity, transform: [{ scale }] }}>
      <Icon
        source={{
          uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
        }}
      />
      <CoinName>{symbol}</CoinName>
    </Wrapper>
  );
};
export default React.memo(Coin);
