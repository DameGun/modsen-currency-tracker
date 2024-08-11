import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrencies } from './thunks';

import LocalStorageManager from '@/services/localStorageManager';
import type { RootState } from '@/store';
import { CacheNames, type CurrenciesCache, CurrenciesCacheFields } from '@/types/cache';
import type { CurrenciesState, CurrencyCodes } from '@/types/currencies';
import { mapCurrenciesResponse } from '@/utils/mappings';

const initialState: CurrenciesState = {
  data: {
    fiat: [],
    crypto: [],
    isEmpty: true,
  },
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
      const response = action.payload;
      const responseLastUpdatedAt = response.ratesResponse.meta.last_updated_at;

      if (responseLastUpdatedAt === state.data.lastUpdatedAt) {
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
