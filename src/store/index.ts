import { configureStore } from '@reduxjs/toolkit';
import banksReducer from './banks';
import currenciesReducer from './currencies';
import themeReducer from './theme';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    currencies: currenciesReducer,
    banks: banksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
