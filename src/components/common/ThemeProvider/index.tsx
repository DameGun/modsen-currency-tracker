import { type ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { selectCurrentTheme } from '@/store/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useAppSelector(selectCurrentTheme);

  useEffect(() => {
    const currThemeAttrValue = document.documentElement.getAttribute('data-theme');

    if (currThemeAttrValue) {
      if (currThemeAttrValue !== mode) {
        document.documentElement.setAttribute('data-theme', mode);
      }
    } else {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);

  return <>{children}</>;
}
