import { createAsyncThunk } from '@reduxjs/toolkit';

import banksGeoDataPath from '@/assets/mock/banks.json';
import type { BanksGeo } from '@/types/mapbox';

export const fetchBanksGeoData = createAsyncThunk<BanksGeo>(
  'banks/fetchBanksGeoData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(banksGeoDataPath);
      const responseJson: BanksGeo = await response.json();

      return responseJson;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
