import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styled from "styled-components/native";
import { coins } from "../api";
import { BLACK_COLOR } from "../colors";
import Coin from "../components/Coin";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const List = styled(FlatList<ICoin>)`
  padding: 20px 10px;
  width: 100%;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Home = () => {
  const { isLoading, data } = useQuery<ICoin[]>(["coins"], coins);
  const [cleanData, setCleanData] = useState<ICoin[]>([]);
  useEffect(() => {
    if (data) {
      setCleanData(
        data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
      );
    }
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size={"large"} />
      </Loader>
    );
  }
  return (
    <Container>
      <List
        data={cleanData}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};

export default Home;
