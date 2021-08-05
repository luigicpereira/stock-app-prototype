import axios from "axios";

const iexAPI = axios.create({
  baseURL: "https://cloud.iexapis.com",
});

export default iexAPI;

export interface HistoricalPrices {
  minute: string;
  close: number;
}

export interface QuoteInfo {
  symbol: string;
  companyName: string;
  latestPrice: number;
  change: number;
  changePercent: number;
}

export interface StockNews {
  datetime: number;
  headline: string;
  summary: string;
  image: string;
}
