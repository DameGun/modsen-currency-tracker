import { ColorMode } from '@/types/theme';

export function getThemeFromStorage(): ColorMode {
  const storagedThemeValue = localStorage.getItem('colorMode');

  if (!storagedThemeValue || !(storagedThemeValue in ColorMode)) {
    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return ColorMode.Light;
    return ColorMode.Dark;
  }

  return storagedThemeValue as ColorMode;
}

export function setThemeToLocalStorage(mode: ColorMode) {
  localStorage.setItem('colorMode', mode);
}
