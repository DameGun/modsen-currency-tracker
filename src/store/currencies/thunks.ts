import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ExchangeRatesResponse } from '@/types/currencies';
import { axiosClient } from '@/utils/axios';

export const fetchCurrencies = createAsyncThunk<ExchangeRatesResponse>(
  'currencies/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/latest');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
