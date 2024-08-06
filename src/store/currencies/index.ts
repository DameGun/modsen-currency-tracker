import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrencies } from './thunks';

import LocalStorageManager from '@/services/localStorageManager';
import { RootState } from '@/store';
import { CacheNames, CurrenciesCache, CurrenciesCacheFields } from '@/types/cache';
import { CurrenciesState, CurrencyCodes, ExchangeRatesResponse } from '@/types/currencies';
import { mapCurrenciesResponse } from '@/utils/mappings';

const initialState: CurrenciesState = {
  data: {
    fiat: [],
    crypto: [],
    isEmpty: true,
  },
  isError: false,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<CurrenciesCache>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.isError = false;

      const response: ExchangeRatesResponse = action.payload;

      if (response.meta.last_updated_at === state.data.lastUpdatedAt) {
        if (state.data.isEmpty) {
          const dataFromStorage = LocalStorageManager.retriveCache<CurrenciesCache>(
            CacheNames.currencies
          );

          if (dataFromStorage !== null) {
            state.data = dataFromStorage;
            return;
          }
        } else {
          return;
        }
      }

      const mappedCurrencies = mapCurrenciesResponse(response);
      state.data = mappedCurrencies;
      LocalStorageManager.setCache<CurrenciesCache>(CacheNames.currencies, mappedCurrencies);
    }),
      builder.addCase(fetchCurrencies.rejected, (state, action) => {
        state.isError = true;
        console.error(action.payload);
      });
  },
});

export const { setCurrencies } = currenciesSlice.actions;

export const selectCurrencies = (state: RootState) => state.currencies.data;
export const selectCurrenciesCodes = createSelector(selectCurrencies, (currencies) => {
  const res: CurrencyCodes = {};

  let key: keyof typeof CurrenciesCacheFields;

  for (key in CurrenciesCacheFields) {
    if (currencies[key].length > 0) {
      currencies[key].map((curr) => {
        res[curr.code] = curr.value;
      });
    }
  }

  return res;
});

export const selectLastUpdatedAt = (state: RootState) => state.currencies.data.lastUpdatedAt;

export default currenciesSlice.reducer;
