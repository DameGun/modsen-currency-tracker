import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CurrenciesResponse } from '@/types/currencies';
import { axiosClient } from '@/utils/axios';
import { getIcons } from '@/utils/getIconForCurrency';

export const fetchCurrencies = createAsyncThunk<CurrenciesResponse>(
  'currencies/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/latest');
      const iconsResponse = await getIcons();

      return { ratesResponse: response.data, iconsResponse };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
