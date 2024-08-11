import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LngLatLike } from 'mapbox-gl';
import { fetchBanksGeoData } from './thunks';

import type { RootState } from '@/store';
import type { BanksState } from '@/types/banks';

const initialState: BanksState = {
  searchTerm: '',
};

const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentFocus: (state, action: PayloadAction<GeoJSON.Position>) => {
      state.currentFocus = action.payload as LngLatLike;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBanksGeoData.fulfilled, (state, action) => {
      state.banksGeoData = action.payload;
    });
  },
});

export const { setSearchTerm, setCurrentFocus } = banksSlice.actions;

export const selectSearchTerm = (state: RootState) => state.banks.searchTerm;
export const selectCurrentFocus = (state: RootState) => state.banks.currentFocus;

export default banksSlice.reducer;
