enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}

interface ThemeState {
  mode: ColorMode;
}

export { ColorMode };

export type { ThemeState };
