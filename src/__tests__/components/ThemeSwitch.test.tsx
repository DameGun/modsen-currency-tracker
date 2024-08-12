import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import '../mocks/commonMocks';
import '../mocks/chartMocks';
import { renderWithProviders } from '@/__tests__/utils/store';
import { ThemeProvider } from '@/components/common';
import { ColorMode } from '@/types/theme';
import { router } from '@/utils/router';

describe('Theme Switch', () => {
  it('switches theme when clicked', () => {
    const { store } = renderWithProviders(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    const themeSwitch = screen.getByRole('toggle-theme');

    expect(store.getState().theme.mode).toBe(ColorMode.Dark);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(themeSwitch);

    expect(store.getState().theme.mode).toBe(ColorMode.Light);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(themeSwitch);

    expect(store.getState().theme.mode).toBe(ColorMode.Dark);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
