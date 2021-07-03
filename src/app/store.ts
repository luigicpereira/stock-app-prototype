import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import stockReducer from "../store/Stock.store";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
