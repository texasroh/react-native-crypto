import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { history, IHistory, info } from "../api";
import { BLACK_COLOR } from "../colors";
import { InNavStackParamList } from "../navigators/InNav";

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

interface IVictory {
  x: number;
  y: number;
}

const Detail: React.FC<
  NativeStackScreenProps<InNavStackParamList, "Detail">
> = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      title: symbol,
      // headerTitle: () => (
      //   <Icon
      //     source={{
      //       uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
      //     }}
      //   />
      // ),
    });
  });

  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    info
  );
  const { isLoading: historyLoading, data: historyData } = useQuery<IHistory[]>(
    ["coinHistory", id],
    history
  );
  console.log(historyData);
  const [victoryData, setVictoryData] = useState<IVictory[]>([]);
  useEffect(() => {
    // if (historyData) {
    //   setVictoryData(
    //     historyData.map((price) => ({
    //       x: new Date(price.timestamp).getTime(),
    //       y: price.price,
    //     }))
    //   );
    //   // console.log(victoryData);
    // }
  }, [historyData]);
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
