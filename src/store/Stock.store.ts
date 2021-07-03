import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../app/store";

import iexAPI, { QuoteInfo } from "../services/iexcloudAPI";

interface Stock {
  symbol: string;
  name: string;
  logoURL: string;
  price: number;
  change: number;
  changePercent: number;
  selected: boolean;
  favorited: boolean;
}

interface RecentStock {
  logoURL: string;
  symbol: string;
  name: string;
  changePercent: number;
  favorited?: boolean;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface StockState {
  stocks: Stock[];
  recentStocks: RecentStock[];
}

const initialState: StockState = {
  stocks: [],
  recentStocks: [],
};

export const selectStock = createAsyncThunk(
  "stock/selectStock",
  async (symbol: string) => {
    let response: AxiosResponse;
    try {
      response = await iexAPI.get(`/stable/stock/${symbol}/quote`, {
        params: {
          token: process.env.REACT_APP_IEX_PUBLIC_KEY,
        },
      });

      return response.data as QuoteInfo;
    } catch (error) {
      if (error.response.status === 404) {
        alert(`Não existe stock com o código ${symbol}`);
      }
      return null;
    }
  }
);

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    toggleFavoriteStock: (state, action: PayloadAction<string>) => {
      state.stocks.forEach((company) => {
        if (company.symbol === action.payload) {
          company.favorited = !company.favorited;
        }
      });
      state.recentStocks.forEach((company) => {
        if (company.symbol === action.payload) {
          company.favorited = !company.favorited;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectStock.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      const {
        symbol,
        companyName: name,
        latestPrice: price,
        change,
        changePercent,
      } = action.payload;

      let selectedStock: Stock;

      state.stocks.forEach((stock) => {
        if (stock.symbol === symbol) {
          Object.assign(stock, {
            price,
            change,
            changePercent,
            selected: true,
          });
          selectedStock = stock;
        } else {
          stock.selected = false;
        }
      });

      if (!selectedStock) {
        selectedStock = {
          symbol,
          name,
          logoURL: `https://storage.googleapis.com/iex/api/logos/${symbol}.png`,
          price,
          change,
          changePercent,
          selected: true,
          favorited: false,
        };
        state.stocks.push(selectedStock);
      }

      let recentStock: RecentStock = {
        symbol,
        name,
        logoURL: selectedStock.logoURL,
        changePercent,
        favorited: selectedStock.favorited,
      };

      state.recentStocks = [recentStock]
        .concat(state.recentStocks.filter((stock) => stock.symbol !== symbol))
        .slice(0, 5);
    });
  },
});

export const { toggleFavoriteStock } = stockSlice.actions;

export const selectSelectedStock = (state: RootState) => {
  return state.stock.stocks.find((stock) => stock.selected);
};

export const selectRecentStocks = (state: RootState) => {
  return state.stock.recentStocks;
};

export const selectFavoritedStocks = (state: RootState) => {
  return state.stock.stocks.filter((stock) => stock.favorited);
};

const stockReducer = stockSlice.reducer;
export default stockReducer;
