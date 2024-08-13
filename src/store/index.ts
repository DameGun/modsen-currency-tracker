import { combineReducers, configureStore } from '@reduxjs/toolkit';
import banksReducer from './banks';
import currenciesReducer from './currencies';
import themeReducer from './theme';

const rootReducer = combineReducers({
  theme: themeReducer,
  currencies: currenciesReducer,
  banks: banksReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
