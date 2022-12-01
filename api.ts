import { QueryFunctionContext } from "@tanstack/react-query";

const BASE_URL = "https://api.coinpaprika.com/v1";

const COINS_URL = `${BASE_URL}/coins`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export const coins = () => fetch(COINS_URL).then((response) => response.json());

export interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_nuew: boolean;
  is_active: boolean;
  type: string;
  logo: string;
}

export const info = ({ queryKey }: QueryFunctionContext) =>
  fetch(`${COINS_URL}/${queryKey[1]}`).then((response) => response.json());

export interface IHistory {
  timestamp: string;
  price: number;
  volumn_24h: number;
  market_cap: number;
}

export const history = ({ queryKey }: QueryFunctionContext) =>
  fetch(
    `${BASE_URL}/tickers/${queryKey[1]}/historical?start=${
      new Date().toISOString().split("T")[0]
    }&internal=2h`
  ).then((response) => response.json());
