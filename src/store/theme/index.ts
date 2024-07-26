import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { ColorMode, ThemeState } from '@/types/theme';
import { getThemeFromStorage, setThemeToLocalStorage } from '@/utils/themeLocalStorage';

const initialState: ThemeState = {
  mode: getThemeFromStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const newMode = state.mode == ColorMode.Light ? ColorMode.Dark : ColorMode.Light;
      setThemeToLocalStorage(newMode);
      state.mode = newMode;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectCurrentTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
